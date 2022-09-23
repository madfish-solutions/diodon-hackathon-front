import { ChangeEventHandler, useCallback } from 'react';

import BigNumber from 'bignumber.js';
import { BigNumber as EthersBigNumber } from 'ethers';
import { FormikHelpers, useFormik } from 'formik';
import { number as numberSchema, object as objectSchema, string as stringSchema } from 'yup';

import { executeTransactionsBatch } from '@blockchain/execute-transactions-batch';
import { useClearingHouse } from '@blockchain/hooks/use-clearing-house';
import { DDAI_DECIMALS } from '@config/constants';
import { AMMS } from '@config/environment';
import { toAtomic } from '@shared/helpers/bignumber';

import { useAccountStore, useApi, useModalsStore } from '../../../hooks';
import { ModalType } from '../../../store/modals.store';
import { MarketId } from '../../../types';

export interface FormValues {
  orderAmount: string;
  market: MarketId;
}

const MIN_ORDER_AMOUNT = 0.01;

export const useWithdrawModalViewModel = () => {
  const modalsStore = useModalsStore();
  const isOpen = modalsStore.isOpen(ModalType.Withdraw);
  const closeModalHandler = () => modalsStore.close();
  const { data } = useAccountStore();
  const buyingPowerUsd = data?.buyingPowerUsd ?? 0;
  const api = useApi();
  const { clearingHouse, getApproves } = useClearingHouse();

  const handleSubmit = useCallback(
    async (values: FormValues, actions: FormikHelpers<FormValues>) => {
      actions.setSubmitting(true);

      await api.call(async () => {
        const rawAmount = EthersBigNumber.from(toAtomic(new BigNumber(values.orderAmount), DDAI_DECIMALS).toFixed());
        const transactionsFunctions = await getApproves(rawAmount);

        if (!clearingHouse) {
          throw new Error('Clearing house is not defined');
        }

        transactionsFunctions.push(async () =>
          clearingHouse.removeMargin(AMMS[values.market], new BigNumber(rawAmount.toString()))
        );

        await executeTransactionsBatch(transactionsFunctions);
      });

      actions.setSubmitting(false);
    },
    [api, clearingHouse, getApproves]
  );

  const formik = useFormik<FormValues>({
    validationSchema: objectSchema().shape({
      orderAmount: numberSchema().min(MIN_ORDER_AMOUNT).max(buyingPowerUsd).required(),
      market: stringSchema().oneOf(['AAPL', 'AMD'], 'Available options: AAPL, AMD').required()
    }),
    initialValues: { orderAmount: '', market: MarketId.APPL },
    onSubmit: handleSubmit
  });

  const value = formik.values.orderAmount;
  const market = formik.values.market;
  const error =
    (formik.touched.orderAmount && formik.errors.orderAmount) ||
    (formik.touched.market && formik.errors.market) ||
    null;

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = event => {
    formik.setFieldValue(event.target.name, event.target.value, true);
  };

  return {
    value,
    handleChange,
    error,
    isOpen,
    market,
    buyingPowerUsd,
    closeModalHandler,
    handleSubmit: formik.handleSubmit,
    isSubmitting: formik.isSubmitting,
    values: formik.values
  };
};
