import { ChangeEventHandler, useCallback, useEffect, useMemo, useState } from 'react';

import BigNumber from 'bignumber.js';
import { BigNumber as EthersBigNumber } from 'ethers';
import { FormikHelpers, useFormik } from 'formik';
import { debounce } from 'throttle-debounce';
import { number as numberSchema, object as objectSchema } from 'yup';

import { executeTransactionsBatch } from '@blockchain/execute-transactions-batch';
import { Amm } from '@blockchain/facades/amm';
import { Dir, Side } from '@blockchain/facades/types';
import { useClearingHouse } from '@blockchain/hooks/use-clearing-house';
import { DDAI_DECIMALS, ZERO_AMOUNT } from '@config/constants';
import { AMMS } from '@config/environment';
import { getFormikError } from '@shared/helpers';
import { toAtomic, toReal } from '@shared/helpers/bignumber';

import { useAccountStore, useApi, useAuthStore, useModalsStore, usePositionsStore } from '../../../hooks';
import { useMarketsStore } from '../../../hooks/use-markets-store';
import { ModalType } from '../../../store/modals.store';
import { MarketId, Undefined } from '../../../types';

export interface FormValues {
  orderAmount: string;
  positionType: Side;
  leverage: number;
}

const FORM_FIELDS = ['orderAmount', 'positionType', 'leverage'] as const;
const MIN_ORDER_AMOUNT = 0.01;
const SLIPPAGE_PERCENTAGE = 3;

export const useOpenPositionModalViewModel = (marketId: Undefined<MarketId>) => {
  const modalsStore = useModalsStore();
  const isOpen = modalsStore.isOpen(ModalType.OpenPosition);
  const closeModalHandler = () => modalsStore.close();
  const marketsStore = useMarketsStore();
  const market = marketId ? marketsStore.getMarket(marketId) : null;
  const accountStore = useAccountStore();
  const positionsStore = usePositionsStore();
  const { dDAIBalance } = accountStore;
  const { address, connection } = useAuthStore();
  const [positionSize, setPositionSize] = useState(ZERO_AMOUNT);
  const api = useApi();
  const { openPosition, getApproves } = useClearingHouse();

  const maxValue = dDAIBalance.decimalPlaces(2).toNumber();

  const amm = useMemo(() => {
    if (market && connection) {
      return new Amm(connection.provider, AMMS[market.marketId], connection.signer);
    }

    return null;
  }, [market, connection]);

  const getPositionSize = useCallback(
    async (collateral: BigNumber, positionType: Side, leverage: number) => {
      return api.call(async () => {
        if (!collateral.isFinite() || collateral.eq(ZERO_AMOUNT) || !amm) {
          return new BigNumber(ZERO_AMOUNT);
        }

        // even don't ask me why
        const notional = toReal(collateral.times(leverage), DDAI_DECIMALS).integerValue(BigNumber.ROUND_DOWN);

        const sizeWithoutSlippage = await amm.getInputPrice(
          positionType === Side.BUY ? Dir.AddToAmm : Dir.RemoveFromAmm,
          notional
        );

        return sizeWithoutSlippage.times(100 - SLIPPAGE_PERCENTAGE).idiv(100);
      });
    },
    [amm, api]
  );

  const handleSubmit = useCallback(
    async (values: FormValues, actions: FormikHelpers<FormValues>) => {
      actions.setSubmitting(true);

      await api.call(async () => {
        const rawMargin = toAtomic(new BigNumber(values.orderAmount), DDAI_DECIMALS);
        const transactionsFunctions = await getApproves(EthersBigNumber.from(rawMargin.toFixed()));

        transactionsFunctions.push(
          async () =>
            (await openPosition(
              marketId!,
              Number(values.positionType),
              rawMargin,
              new BigNumber(values.leverage),
              await getPositionSize(rawMargin, values.positionType, values.leverage)
            ))!
        );

        await executeTransactionsBatch(transactionsFunctions);
        modalsStore.close();
        await Promise.all([
          accountStore.loadFreeCollateral(AMMS[marketId!], address!),
          positionsStore.loadPositions(address!)
        ]);
      }, 'Position has been successfully opened!');

      actions.setSubmitting(false);
    },
    [api, openPosition, marketId, getApproves, accountStore, address, positionsStore, modalsStore, getPositionSize]
  );

  const formik = useFormik<FormValues>({
    validationSchema: objectSchema().shape({
      orderAmount: numberSchema().min(MIN_ORDER_AMOUNT).max(maxValue).required(),
      leverage: numberSchema().min(2).max(10).integer().required(),
      positionType: numberSchema().oneOf([Side.BUY, Side.SELL]).required()
    }),
    initialValues: { orderAmount: '', positionType: Side.BUY, leverage: 2 },
    onSubmit: handleSubmit
  });

  const value = formik.values.orderAmount;
  const positionType = formik.values.positionType;
  const leverage = formik.values.leverage;
  const error = FORM_FIELDS.map(fieldName => getFormikError(formik, fieldName)).find(Boolean) ?? null;
  const positionTypeName = positionType === Side.BUY ? 'long' : 'short';

  const updatePositionSize = useMemo(
    () =>
      debounce(100, async () => {
        try {
          const rawPositionSize = await getPositionSize(
            toAtomic(new BigNumber(formik.values.orderAmount), DDAI_DECIMALS),
            formik.values.positionType,
            formik.values.leverage
          );

          setPositionSize(toReal(rawPositionSize, DDAI_DECIMALS).decimalPlaces(6).toNumber());
        } finally {
          // do nothing
        }
      }),
    [getPositionSize, formik]
  );

  useEffect(() => {
    updatePositionSize();
  }, [value, positionType, leverage, updatePositionSize]);

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = event => {
    formik.setFieldValue(event.target.name, event.target.value, true);
  };

  const handleLeverageChange = (newValue: number) => {
    formik.setFieldValue('leverage', newValue, true);
  };

  const setPositionType = (newPositionType: Side) => {
    formik.setFieldValue('positionType', newPositionType, true);
  };

  useEffect(() => {
    if (address) {
      api.call(async () => accountStore.loadDDAIBalance(address));
    }
  }, [accountStore, api, address, marketId]);

  return {
    value,
    handleChange,
    error,
    leverage,
    handleLeverageChange,
    market,
    isOpen,
    maxValue,
    closeModalHandler,
    handleSubmit: formik.handleSubmit,
    isSubmitting: formik.isSubmitting,
    positionSize,
    positionType,
    positionTypeName,
    setPositionType,
    values: formik.values,
    slippagePercentage: SLIPPAGE_PERCENTAGE,
    minReceiveAmount: positionSize
  };
};
