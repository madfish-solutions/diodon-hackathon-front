import { ChangeEventHandler, useCallback } from 'react';

import { TransactionResponse } from '@ethersproject/abstract-provider';
import BigNumber from 'bignumber.js';
import { BigNumber as EthersBigNumber } from 'ethers';
import { FormikHelpers, useFormik } from 'formik';
import { number as numberSchema, object as objectSchema, string as stringSchema } from 'yup';

import { ERC20TokenContractWrapper } from '@blockchain/erc20-contract-wrapper';
import { executeTransactionsBatch } from '@blockchain/execute-transactions-batch';
import { ClearingHouse } from '@blockchain/facades';
import { DDAI_DECIMALS, ZERO_AMOUNT } from '@config/constants';
import { CLEARING_HOUSE_ADDRESS, DDAI_ADDRESS } from '@config/environment';
import { toAtomic } from '@shared/helpers/bignumber';

import { useAccountStore, useApi, useAuthStore, useModalsStore } from '../../../hooks';
import { ModalType } from '../../../store/modals.store';

export interface FormValues {
  orderAmount: string;
  market: 'AAPL' | 'AMD';
}

const MIN_ORDER_AMOUNT = 0.01;

const amms = {
  AAPL: '0x21f98596D0bb9da7fFcA2a3e29d47FcEA858e79B',
  AMD: '0xA7675BDD2f6029e43F7EbB345da77B3deaf2B2cF'
};

export const useDepositModalViewModel = () => {
  const modalsStore = useModalsStore();
  const authStore = useAuthStore();
  const isOpen = modalsStore.isOpen(ModalType.Deposit);
  const closeModalHandler = () => modalsStore.close();
  const { data } = useAccountStore();
  const buyingPowerUsd = data?.buyingPowerUsd ?? 0;
  const api = useApi();

  const handleSubmit = useCallback(
    async (values: FormValues, actions: FormikHelpers<FormValues>) => {
      actions.setSubmitting(true);

      await api.call(async () => {
        const dDaiTransactionContract = new ERC20TokenContractWrapper(DDAI_ADDRESS, authStore.connection!.signer);
        const dDaiViewContract = new ERC20TokenContractWrapper(DDAI_ADDRESS, authStore.connection!.provider);
        const clearingHouse = new ClearingHouse(
          authStore.connection!.provider,
          CLEARING_HOUSE_ADDRESS,
          authStore.connection!.signer
        );
        const rawAmount = EthersBigNumber.from(toAtomic(new BigNumber(values.orderAmount), DDAI_DECIMALS).toFixed());
        const allowance = await dDaiViewContract.methods.allowance(authStore.address!, CLEARING_HOUSE_ADDRESS);
        const transactionsFunctions: Array<() => Promise<TransactionResponse>> = [];

        if (EthersBigNumber.from(allowance).gt(ZERO_AMOUNT) && rawAmount.gt(allowance)) {
          transactionsFunctions.push(async () =>
            dDaiTransactionContract.methods.approve(CLEARING_HOUSE_ADDRESS, EthersBigNumber.from(ZERO_AMOUNT))
          );
        }
        if (rawAmount.gt(allowance)) {
          transactionsFunctions.push(async () =>
            dDaiTransactionContract.methods.approve(CLEARING_HOUSE_ADDRESS, rawAmount)
          );
        }
        transactionsFunctions.push(async () =>
          clearingHouse.addMargin(amms[values.market], new BigNumber(rawAmount.toString()))
        );
        await executeTransactionsBatch(transactionsFunctions);
      });

      actions.setSubmitting(false);
    },
    [api, authStore.connection, authStore.address]
  );

  const formik = useFormik<FormValues>({
    validationSchema: objectSchema().shape({
      market: stringSchema().oneOf(['AAPL', 'AMD'], 'Available options: AAPL, AMD').required(),
      orderAmount: numberSchema().min(MIN_ORDER_AMOUNT).max(buyingPowerUsd).required()
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

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    formik.setFieldValue(event.target.name, event.target.value, true);
  };

  return {
    market,
    value,
    handleChange,
    error,
    isOpen,
    buyingPowerUsd,
    closeModalHandler,
    handleSubmit: formik.handleSubmit,
    isSubmitting: formik.isSubmitting,
    values: formik.values
  };
};
