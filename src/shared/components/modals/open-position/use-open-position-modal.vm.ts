import { useCallback, ChangeEventHandler } from 'react';

import BigNumber from 'bignumber.js';
import { FormikHelpers, useFormik } from 'formik';
import { number as numberSchema, object as objectSchema } from 'yup';

import { Side } from '@blockchain/facades/types';
import { useClearingHouse } from '@blockchain/hooks/use-clearing-house';

import { useAccountStore, useApi, useModalsStore } from '../../../hooks';
import { useMarketsStore } from '../../../hooks/use-markets-store';
import { ModalType } from '../../../store/modals.store';
import { MarketId, Undefined } from '../../../types';

export interface FormValues {
  orderAmount: string;
}

const MIN_ORDER_AMOUNT = 0.01;

export const useOpenPositionModalViewModel = (marketId: Undefined<MarketId>) => {
  const modalsStore = useModalsStore();
  const isOpen = modalsStore.isOpen(ModalType.OpenPosition);
  const closeModalHandler = () => modalsStore.close();
  const marketsStore = useMarketsStore();
  const market = marketId ? marketsStore.getMarket(marketId) : null;
  const { data } = useAccountStore();
  const buyingPowerUsd = data?.buyingPowerUsd ?? 0;
  const api = useApi();
  const { openPosition } = useClearingHouse();

  const handleSubmit = useCallback(
    async (values: FormValues, actions: FormikHelpers<FormValues>) => {
      actions.setSubmitting(true);

      await api.call(async () => {
        // TODO: CONTRACT API CALL
        // eslint-disable-next-line no-console
        console.log('values', values);
        if (values.orderAmount === '1231') {
          await openPosition(Side.BUY, new BigNumber(1), new BigNumber(2), new BigNumber(3));
        }
      });

      actions.setSubmitting(false);
    },
    [api, openPosition]
  );

  const formik = useFormik<FormValues>({
    validationSchema: objectSchema().shape({
      orderAmount: numberSchema().min(MIN_ORDER_AMOUNT).max(buyingPowerUsd).required()
    }),
    initialValues: { orderAmount: '' },
    onSubmit: handleSubmit
  });

  const value = formik.values.orderAmount;
  const error = formik.touched.orderAmount ? formik.errors.orderAmount : null;

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    formik.setValues({ orderAmount: event.target.value }, true);
  };

  return {
    value,
    handleChange,
    error,
    market,
    isOpen,
    buyingPowerUsd,
    closeModalHandler,
    handleSubmit: formik.handleSubmit,
    isSubmitting: formik.isSubmitting,
    values: formik.values
  };
};
