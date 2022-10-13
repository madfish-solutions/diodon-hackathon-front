import { useCallback, ChangeEventHandler, useMemo, useState, useEffect, useRef } from 'react';

import BigNumber from 'bignumber.js';
import { BigNumber as EthersBigNumber } from 'ethers';
import { FormikHelpers, useFormik } from 'formik';
import { number as numberSchema, object as objectSchema } from 'yup';

import { Amm } from '@blockchain/facades/amm';
import { Side } from '@blockchain/facades/types';
import { useClearingHouse } from '@blockchain/hooks/use-clearing-house';
import { DDAI_DECIMALS, SLIPPAGE_PERCENTAGE, WHOLE_PERCENTAGE, ZERO_AMOUNT } from '@config/constants';
import { AMMS } from '@config/environment';
import { getFormikError, isExist } from '@shared/helpers';
import { toAtomic } from '@shared/helpers/bignumber';
import {
  getNoSlippagePositionLimit,
  getPositionLimitWithSlippage,
  useAccountStore,
  useAddedPositionLimit,
  useApi,
  useAuthStore,
  useDDAIBalance,
  useMaxHoldingBaseAsset,
  useModalsStore,
  usePositionsStore
} from '@shared/hooks';

import { useMarketsStore } from '../../../hooks/use-markets-store';
import { ModalType } from '../../../store/modals.store';
import { MarketId, PositionType, Undefined } from '../../../types';

export interface FormValues {
  orderAmount: string;
  leverage: number;
}

const FORM_FIELDS = ['orderAmount', 'leverage'] as const;
const MIN_ORDER_AMOUNT = 0.01;

enum FormType {
  Deposit = 'deposit',
  Withdraw = 'withdraw'
}

export const FORMS_OPTIONS = [
  { label: 'Deposit', value: FormType.Deposit },
  { label: 'Withdraw', value: FormType.Withdraw }
];

// eslint-disable-next-line sonarjs/cognitive-complexity
export const useManagePositionModalViewModel = (marketId: Undefined<MarketId>) => {
  const modalsStore = useModalsStore();
  const isOpen = modalsStore.isOpen(ModalType.ManagePosition);
  const closeModalHandler = () => modalsStore.close();
  const accountStore = useAccountStore();
  const marketsStore = useMarketsStore();
  const market = marketId ? marketsStore.getMarket(marketId) : null;
  const api = useApi();
  const { clearingHouse, getApproves, openPosition } = useClearingHouse();
  const { address, connection } = useAuthStore();
  const positionsStore = usePositionsStore();
  const position = isExist(marketId) ? positionsStore.getPosition(marketId) : null;
  const [positionBeingChanged, setPositionBeingChanged] = useState(false);
  const { balance, updateDDAIBalance } = useDDAIBalance();
  const prevMarketIdRef = useRef(marketId);
  const [formType, setFormType] = useState(FormType.Deposit);

  const amm = useMemo(() => {
    if (market && connection) {
      return new Amm(connection.provider, AMMS[market.marketId], connection.signer);
    }

    return null;
  }, [market, connection]);
  const { maxHoldingBaseAsset, updateMaxHoldingBaseAsset } = useMaxHoldingBaseAsset(amm);

  const getFee = useCallback(
    async (notional: BigNumber) => {
      if (!amm) {
        return {
          tollFee: new BigNumber(ZERO_AMOUNT),
          spreadFee: new BigNumber(ZERO_AMOUNT)
        };
      }

      return await amm.calcFee(notional);
    },
    [amm]
  );

  const handleSubmit = useCallback(
    async (values: FormValues, actions: FormikHelpers<FormValues>) => {
      try {
        actions.setSubmitting(true);
        await api.call(async () => {
          const rawMargin = toAtomic(new BigNumber(values.orderAmount), DDAI_DECIMALS);
          const { tollFee, spreadFee } = await getFee(rawMargin.times(values.leverage));
          const feeRelatedAllowance = tollFee
            .plus(spreadFee)
            .times(WHOLE_PERCENTAGE + SLIPPAGE_PERCENTAGE)
            .div(WHOLE_PERCENTAGE)
            .integerValue(BigNumber.ROUND_CEIL);
          const allowance = rawMargin.plus(feeRelatedAllowance);
          await getApproves(EthersBigNumber.from(allowance.toFixed()));

          await openPosition(
            marketId!,
            position!.type === PositionType.LONG ? Side.LONG : Side.SHORT,
            rawMargin,
            toAtomic(new BigNumber(values.leverage), DDAI_DECIMALS),
            getPositionLimitWithSlippage(
              await getNoSlippagePositionLimit(amm, rawMargin, position!.type, values.leverage),
              position!.type
            ).integerValue(BigNumber.ROUND_DOWN)
          );

          modalsStore.close();
          await Promise.all([
            accountStore.loadFreeCollateral(AMMS[marketId!], address!),
            positionsStore.loadPositions(address!),
            accountStore.loadDDAIBalance(address!)
          ]);
        }, 'Position has been successfully opened!');
      } finally {
        actions.setSubmitting(false);
      }
    },
    [
      api,
      getFee,
      getApproves,
      openPosition,
      marketId,
      position,
      amm,
      modalsStore,
      accountStore,
      address,
      positionsStore
    ]
  );

  const formik = useFormik<FormValues>({
    validationSchema: objectSchema().shape({
      orderAmount: numberSchema().min(MIN_ORDER_AMOUNT).max(balance, 'Balance is too low.').required(),
      leverage: numberSchema().min(2).max(10).integer().required()
    }),
    initialValues: { orderAmount: '', leverage: 2 },
    onSubmit: handleSubmit
  });

  const leverage = formik.values.leverage;
  const value = formik.values.orderAmount;

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    formik.setFieldValue('orderAmount', event.target.value, true);
  };

  const handleLeverageChange = (newValue: number) => {
    formik.setFieldValue('leverage', newValue, true);
  };

  const order = useMemo(
    () => ({
      ...formik.values,
      positionType: position?.type ?? PositionType.LONG
    }),
    [formik.values, position]
  );
  const {
    positionLimit: addedPositionLimit,
    updatePositionLimit,
    noSlippagePositionLimit: noSlippageAddedPositionLimit
  } = useAddedPositionLimit(order, amm);

  const positionSize = useMemo(() => {
    if (position?.type === PositionType.LONG) {
      return addedPositionLimit.plus(position?.amountTokens ?? ZERO_AMOUNT);
    }

    return noSlippageAddedPositionLimit.plus(position?.amountTokens ?? ZERO_AMOUNT);
  }, [addedPositionLimit, noSlippageAddedPositionLimit, position]);
  const noSlippagePositionSize = useMemo(
    () => noSlippageAddedPositionLimit.plus(position?.amountTokens ?? ZERO_AMOUNT),
    [noSlippageAddedPositionLimit, position]
  );
  const error = useMemo(() => {
    if (noSlippagePositionSize.gt(maxHoldingBaseAsset)) {
      return 'Position size is too big.';
    }

    return FORM_FIELDS.map(fieldName => getFormikError(formik, fieldName)).find(Boolean) ?? null;
  }, [formik, maxHoldingBaseAsset, noSlippagePositionSize]);

  const closePosition = useCallback(async () => {
    try {
      formik.setSubmitting(true);
      setPositionBeingChanged(true);
      await api.call(async () => {
        if (!clearingHouse || !marketId) {
          return;
        }

        const { tollFee, spreadFee } = await getFee(toAtomic(new BigNumber(position!.amountUsd), DDAI_DECIMALS));
        const feeRelatedAllowance = tollFee
          .plus(spreadFee)
          .times(WHOLE_PERCENTAGE + SLIPPAGE_PERCENTAGE)
          .div(WHOLE_PERCENTAGE)
          .integerValue(BigNumber.ROUND_CEIL);
        await getApproves(EthersBigNumber.from(feeRelatedAllowance.toFixed()));
        await clearingHouse.closePosition(AMMS[marketId], new BigNumber(ZERO_AMOUNT));
        modalsStore.close();
        await positionsStore.loadPositions(address!);
      });
    } finally {
      setPositionBeingChanged(false);
      formik.setSubmitting(false);
    }
  }, [address, api, clearingHouse, formik, getApproves, getFee, marketId, modalsStore, position, positionsStore]);

  useEffect(() => {
    updatePositionLimit();
    updateMaxHoldingBaseAsset();
  }, [value, leverage, updatePositionLimit, updateMaxHoldingBaseAsset]);

  useEffect(() => {
    if (prevMarketIdRef.current !== marketId) {
      updateDDAIBalance();
    }
    prevMarketIdRef.current = marketId;
  }, [marketId, updateDDAIBalance]);

  const positionSizeUsd = positionSize.times(market?.marketPriceUsd ?? ZERO_AMOUNT).toNumber();

  const toggleFormType = (ft: FormType) => {
    setFormType(ft);
    formik.setFieldValue('orderAmount', 0, true);
  };

  return {
    closePosition,
    value,
    leverage,
    handleChange,
    handleLeverageChange,
    error,
    market,
    isOpen,
    balance,
    closeModalHandler,
    handleSubmit: formik.handleSubmit,
    isSubmitting: formik.isSubmitting,
    positionBeingChanged,
    isLoading: formik.isSubmitting,
    submitDisabled: formik.isSubmitting || isExist(error),
    positionSize,
    positionSizeUsd,
    formType,
    toggleFormType,
    isDeposit: formType === FormType.Deposit
  };
};
