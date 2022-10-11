import { ChangeEventHandler, useCallback, useEffect, useMemo, useState } from 'react';

import BigNumber from 'bignumber.js';
import { BigNumber as EthersBigNumber } from 'ethers';
import { FormikHelpers, useFormik } from 'formik';
import { debounce } from 'throttle-debounce';
import { number as numberSchema, object as objectSchema, string } from 'yup';

import { Amm } from '@blockchain/facades/amm';
import { Dir, Side } from '@blockchain/facades/types';
import { useClearingHouse } from '@blockchain/hooks/use-clearing-house';
import { DDAI_DECIMALS, WHOLE_PERCENTAGE, ZERO_AMOUNT } from '@config/constants';
import { AMMS } from '@config/environment';
import { getFormikError, isExist } from '@shared/helpers';
import { toAtomic, toReal } from '@shared/helpers/bignumber';

import { useAccountStore, useApi, useAuthStore, useModalsStore, usePositionsStore } from '../../../hooks';
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
const SLIPPAGE_PERCENTAGE = 3;

const getPositionSizeWithSlippage = (noSlippageSize: BigNumber, positionType: PositionType) => {
  if (positionType === PositionType.LONG) {
    return new BigNumber(noSlippageSize).times(WHOLE_PERCENTAGE - SLIPPAGE_PERCENTAGE).div(WHOLE_PERCENTAGE);
  }

  return new BigNumber(noSlippageSize).times(WHOLE_PERCENTAGE + SLIPPAGE_PERCENTAGE).div(WHOLE_PERCENTAGE);
};

export const useOpenPositionModalViewModel = (
  marketId: Undefined<MarketId>,
  recommendedPositionType: Undefined<PositionType>
  // eslint-disable-next-line sonarjs/cognitive-complexity
) => {
  const modalsStore = useModalsStore();
  const isOpen = modalsStore.isOpen(ModalType.OpenPosition);
  const closeModalHandler = () => modalsStore.close();
  const marketsStore = useMarketsStore();
  const market = marketId ? marketsStore.getMarket(marketId) : null;
  const accountStore = useAccountStore();
  const positionsStore = usePositionsStore();
  const { dDAIBalance } = accountStore;
  const { address, connection } = useAuthStore();
  const [noSlippagePositionSize, setNoSlippagePositionSize] = useState(ZERO_AMOUNT);
  const [maxHoldingBaseAsset, setMaxHoldingBaseAsset] = useState(Infinity);
  const api = useApi();
  const { openPosition, getApproves } = useClearingHouse();

  const balance = dDAIBalance.decimalPlaces(2, BigNumber.ROUND_DOWN).toNumber();

  const amm = useMemo(() => {
    if (market && connection) {
      return new Amm(connection.provider, AMMS[market.marketId], connection.signer);
    }

    return null;
  }, [market, connection]);

  const getNoSlippagePositionSize = useCallback(
    async (atomicCollateral: BigNumber, positionType: PositionType, leverage: number) => {
      return api.call(async () => {
        if (!atomicCollateral.isFinite() || atomicCollateral.eq(ZERO_AMOUNT) || !amm) {
          return new BigNumber(ZERO_AMOUNT);
        }

        const notional = atomicCollateral.times(leverage).integerValue(BigNumber.ROUND_DOWN);

        return await amm.getInputPrice(positionType === PositionType.LONG ? Dir.AddToAmm : Dir.RemoveFromAmm, notional);
      });
    },
    [amm, api]
  );

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
      actions.setSubmitting(true);

      await api.call(async () => {
        const rawMargin = toAtomic(new BigNumber(values.orderAmount), DDAI_DECIMALS);
        const { tollFee, spreadFee } = await getFee(rawMargin.times(values.leverage));
        const allowance = rawMargin.plus(tollFee).plus(spreadFee);
        await getApproves(EthersBigNumber.from(allowance.toFixed()));

        await openPosition(
          marketId!,
          values.positionType === PositionType.LONG ? Side.LONG : Side.SHORT,
          rawMargin,
          toAtomic(new BigNumber(values.leverage), DDAI_DECIMALS),
          getPositionSizeWithSlippage(
            await getNoSlippagePositionSize(rawMargin, values.positionType, values.leverage),
            values.positionType
          ).integerValue(BigNumber.ROUND_DOWN)
        );

        modalsStore.close();
        await Promise.all([
          accountStore.loadFreeCollateral(AMMS[marketId!], address!),
          positionsStore.loadPositions(address!)
        ]);
      }, 'Position has been successfully opened!');

      actions.setSubmitting(false);
    },
    [
      api,
      getFee,
      openPosition,
      marketId,
      getApproves,
      accountStore,
      address,
      positionsStore,
      modalsStore,
      getNoSlippagePositionSize
    ]
  );

  const formik = useFormik<FormValues>({
    validationSchema: objectSchema().shape({
      orderAmount: numberSchema().min(MIN_ORDER_AMOUNT).max(balance, 'Balance is too low.').required(),
      leverage: numberSchema().min(2).max(10).integer().required(),
      positionType: string().oneOf([PositionType.LONG, PositionType.SHORT]).required()
    }),
    initialValues: {
      orderAmount: '',
      positionType: recommendedPositionType ? recommendedPositionType : PositionType.LONG,
      leverage: 2
    },
    onSubmit: handleSubmit
  });

  const value = formik.values.orderAmount;
  const positionType = formik.values.positionType;
  const leverage = formik.values.leverage;
  const error = useMemo(() => {
    if (noSlippagePositionSize > maxHoldingBaseAsset) {
      return 'Position size is too big.';
    }

    return FORM_FIELDS.map(fieldName => getFormikError(formik, fieldName)).find(Boolean) ?? null;
  }, [formik, maxHoldingBaseAsset, noSlippagePositionSize]);

  const updatePositionSize = useMemo(
    () =>
      debounce(100, async () => {
        try {
          const rawPositionSize = await getNoSlippagePositionSize(
            toAtomic(new BigNumber(formik.values.orderAmount), DDAI_DECIMALS),
            formik.values.positionType,
            formik.values.leverage
          );

          const realPositionSize = toReal(rawPositionSize, DDAI_DECIMALS).decimalPlaces(6).toNumber();
          setNoSlippagePositionSize(realPositionSize);
        } finally {
          // do nothing
        }
      }),
    [getNoSlippagePositionSize, formik]
  );

  const updateLiquiditySizeLimit = useMemo(
    () =>
      debounce(100, async () => {
        if (!amm) {
          return;
        }

        try {
          setMaxHoldingBaseAsset(toReal(await amm.getMaxHoldingBaseAsset(), DDAI_DECIMALS).toNumber());
        } finally {
          // do nothing
        }
      }),
    [amm]
  );

  useEffect(() => {
    updatePositionSize();
    updateLiquiditySizeLimit();
  }, [value, positionType, leverage, updatePositionSize, updateLiquiditySizeLimit]);

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
    if (address) {
      api.call(async () => accountStore.loadDDAIBalance(address));
    }
  }, [accountStore, api, address, marketId]);

  const positionSize = useMemo(() => {
    return getPositionSizeWithSlippage(new BigNumber(noSlippagePositionSize), positionType);
  }, [noSlippagePositionSize, positionType]);

  const positionSizeUsd = positionSize.toNumber() * (market?.indexPriceUsd ?? 0);

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
