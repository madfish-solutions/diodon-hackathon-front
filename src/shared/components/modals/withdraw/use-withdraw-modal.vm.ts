import { ChangeEventHandler, useCallback } from 'react';

import { TransactionResponse } from '@ethersproject/abstract-provider';
import BigNumber from 'bignumber.js';
import { BigNumber as EthersBigNumber } from 'ethers';
import { FormikHelpers, useFormik } from 'formik';
import { number as numberSchema, object as objectSchema, string as stringSchema } from 'yup';

import { executeTransactionsBatch } from '@blockchain/execute-transactions-batch';
import { ClearingHouse } from '@blockchain/facades';
import { DDAI_DECIMALS } from '@config/constants';
import { AMMS, CLEARING_HOUSE_ADDRESS } from '@config/environment';
import { toAtomic } from '@shared/helpers/bignumber';

import { useAccountStore, useApi, useAuthStore, useModalsStore } from '../../../hooks';
import { ModalType } from '../../../store/modals.store';

export interface FormValues {
  orderAmount: string;
  market: 'AAPL' | 'AMD';
}

const MIN_ORDER_AMOUNT = 0.01;

export const useWithdrawModalViewModel = () => {
  const modalsStore = useModalsStore();
  const isOpen = modalsStore.isOpen(ModalType.Withdraw);
  const closeModalHandler = () => modalsStore.close();
  const { data } = useAccountStore();
  const authStore = useAuthStore();
  const buyingPowerUsd = data?.buyingPowerUsd ?? 0;
  const api = useApi();

  const handleSubmit = useCallback(
    async (values: FormValues, actions: FormikHelpers<FormValues>) => {
      actions.setSubmitting(true);

      await api.call(async () => {
        const clearingHouse = new ClearingHouse(
          authStore.connection!.provider,
          CLEARING_HOUSE_ADDRESS,
          authStore.connection!.signer
        );
        const rawAmount = EthersBigNumber.from(toAtomic(new BigNumber(values.orderAmount), DDAI_DECIMALS).toFixed());
        const transactionsFunctions: Array<() => Promise<TransactionResponse>> = [];

        transactionsFunctions.push(async () =>
          clearingHouse.removeMargin(AMMS[values.market], new BigNumber(rawAmount.toString()))
        );
        await executeTransactionsBatch(transactionsFunctions);
      });

      actions.setSubmitting(false);
    },
    [api, authStore.connection]
  );

  const formik = useFormik<FormValues>({
    validationSchema: objectSchema().shape({
      orderAmount: numberSchema().min(MIN_ORDER_AMOUNT).max(buyingPowerUsd).required(),
      market: stringSchema().oneOf(['AAPL', 'AMD'], 'Available options: AAPL, AMD').required()
    }),
    initialValues: { orderAmount: '', market: 'AAPL' },
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
