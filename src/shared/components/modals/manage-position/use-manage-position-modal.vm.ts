import { useCallback, ChangeEventHandler } from 'react';

import { FormikHelpers, useFormik } from 'formik';
import { number as numberSchema, object as objectSchema } from 'yup';

import { useAccountStore, useApi, useModalsStore } from '../../../hooks';
import { useMarketsStore } from '../../../hooks/use-markets-store';
import { ModalType } from '../../../store/modals.store';
import { MarketId } from '../../../types';

export interface FormValues {
  orderAmount: string;
}

const MIN_ORDER_AMOUNT = 0.01;

export const useManagePositionModalViewModel = (marketId: MarketId) => {
  const modalsStore = useModalsStore();
  const isOpen = modalsStore.isOpen(ModalType.ManagePosition);
  const closeModalHandler = () => modalsStore.close();
  const marketsStore = useMarketsStore();
  const market = marketsStore.getMarket(marketId);
  const { data } = useAccountStore();
  const buyingPowerUsd = data?.buyingPowerUsd ?? 0;
  const api = useApi();

  const handleSubmit = useCallback(
    async (values: FormValues, actions: FormikHelpers<FormValues>) => {
      actions.setSubmitting(true);

      await api.call(async () => {
        // TODO: CONTRACT API CALL
        // eslint-disable-next-line no-console
        console.log('values', values);
      });

      actions.setSubmitting(false);
    },
    [api]
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
