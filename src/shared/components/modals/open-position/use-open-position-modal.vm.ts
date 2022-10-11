import { ChangeEventHandler, useCallback, useEffect, useMemo, useRef } from 'react';

import BigNumber from 'bignumber.js';
import { BigNumber as EthersBigNumber } from 'ethers';
import { FormikHelpers, useFormik } from 'formik';
import { number as numberSchema, object as objectSchema, string } from 'yup';

import { Amm } from '@blockchain/facades/amm';
import { Side } from '@blockchain/facades/types';
import { useClearingHouse } from '@blockchain/hooks/use-clearing-house';
import { DDAI_DECIMALS, SLIPPAGE_PERCENTAGE, WHOLE_PERCENTAGE, ZERO_AMOUNT } from '@config/constants';
import { AMMS } from '@config/environment';
import { getFormikError, isExist } from '@shared/helpers';
import { toAtomic } from '@shared/helpers/bignumber';

import {
  getNoSlippagePositionSize,
  getPositionSizeWithSlippage,
  useAccountStore,
  useAddedPositionSize,
  useApi,
  useAuthStore,
  useDDAIBalance,
  useMaxHoldingBaseAsset,
  useModalsStore,
  usePositionsStore
} from '../../../hooks';
import { useMarketsStore } from '../../../hooks/use-markets-store';
import { ModalType } from '../../../store/modals.store';
import { MarketId, PositionType, Undefined } from '../../../types';

export interface FormValues {
  orderAmount: string;
  positionType: PositionType;
  leverage: number;
}

const FORM_FIELDS = ['orderAmount', 'positionType', 'leverage'] as const;
const MIN_ORDER_AMOUNT = 0.01;

// eslint-disable-next-line sonarjs/cognitive-complexity
export const useOpenPositionModalViewModel = (marketId: Undefined<MarketId>) => {
  const modalsStore = useModalsStore();
  const isOpen = modalsStore.isOpen(ModalType.OpenPosition);
  const closeModalHandler = () => modalsStore.close();
  const marketsStore = useMarketsStore();
  const market = marketId ? marketsStore.getMarket(marketId) : null;
  const prevMarketIdRef = useRef(marketId);
  const accountStore = useAccountStore();
  const positionsStore = usePositionsStore();
  const { address, connection } = useAuthStore();
  const api = useApi();
  const { openPosition, getApproves } = useClearingHouse();

  const { balance, updateDDAIBalance } = useDDAIBalance();

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
            values.positionType === PositionType.LONG ? Side.LONG : Side.SHORT,
            rawMargin,
            toAtomic(new BigNumber(values.leverage), DDAI_DECIMALS),
            getPositionSizeWithSlippage(
              await getNoSlippagePositionSize(amm, rawMargin, values.positionType, values.leverage),
              values.positionType
            ).integerValue(BigNumber.ROUND_DOWN)
          );

          modalsStore.close();
          await Promise.all([
            accountStore.loadFreeCollateral(AMMS[marketId!], address!),
            positionsStore.loadPositions(address!)
          ]);
        }, 'Position has been successfully opened!');
      } finally {
        actions.setSubmitting(false);
      }
    },
    [api, getFee, openPosition, marketId, getApproves, accountStore, address, positionsStore, modalsStore, amm]
  );

  const formik = useFormik<FormValues>({
    validationSchema: objectSchema().shape({
      orderAmount: numberSchema().min(MIN_ORDER_AMOUNT).max(balance, 'Balance is too low.').required(),
      leverage: numberSchema().min(2).max(10).integer().required(),
      positionType: string().oneOf([PositionType.LONG, PositionType.SHORT]).required()
    }),
    initialValues: { orderAmount: '', positionType: PositionType.LONG, leverage: 2 },
    onSubmit: handleSubmit
  });

  const { noSlippagePositionSize, positionSize, updatePositionSize } = useAddedPositionSize(formik.values, amm);

  const value = formik.values.orderAmount;
  const positionType = formik.values.positionType;
  const leverage = formik.values.leverage;
  const error = useMemo(() => {
    if (noSlippagePositionSize > maxHoldingBaseAsset) {
      return 'Position size is too big.';
    }

    return FORM_FIELDS.map(fieldName => getFormikError(formik, fieldName)).find(Boolean) ?? null;
  }, [formik, maxHoldingBaseAsset, noSlippagePositionSize]);

  useEffect(() => {
    updatePositionSize();
    updateMaxHoldingBaseAsset();
  }, [value, positionType, leverage, updatePositionSize, updateMaxHoldingBaseAsset]);

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = event => {
    formik.setFieldValue(event.target.name, event.target.value, true);
  };

  const handleLeverageChange = (newValue: number) => {
    formik.setFieldValue('leverage', newValue, true);
  };

  const setPositionType = (newPositionType: PositionType) => {
    formik.setFieldValue('positionType', newPositionType, true);
  };

  useEffect(() => {
    if (prevMarketIdRef.current !== marketId) {
      updateDDAIBalance();
    }
    prevMarketIdRef.current = marketId;
  }, [marketId, updateDDAIBalance]);

  const positionSizeUsd = positionSize.toNumber() * Number(market?.indexPriceUsd ?? ZERO_AMOUNT);

  return {
    value,
    handleChange,
    error,
    leverage,
    handleLeverageChange,
    market,
    isOpen,
    balance,
    closeModalHandler,
    handleSubmit: formik.handleSubmit,
    submitDisabled: formik.isSubmitting || isExist(error),
    positionType,
    setPositionType,
    values: formik.values,
    slippagePercentage: SLIPPAGE_PERCENTAGE,
    positionSize,
    positionSizeUsd
  };
};
