import { ChangeEventHandler, useCallback } from 'react';

import BigNumber from 'bignumber.js';
import { BigNumber as EthersBigNumber } from 'ethers';
import { FormikHelpers, useFormik } from 'formik';
import { number as numberSchema, object as objectSchema, string as stringSchema } from 'yup';

import { executeTransactionsBatch } from '@blockchain/execute-transactions-batch';
import { useClearingHouse } from '@blockchain/hooks/use-clearing-house';
import { DDAI_DECIMALS } from '@config/constants';
import { AMMS } from '@config/environment';
import { Tab } from '@shared/components';
import { getFormikError, isEqual } from '@shared/helpers';
import { toAtomic } from '@shared/helpers/bignumber';

import { useAccountStore, useApi, useAuthStore, useModalsStore } from '../../../hooks';
import { ModalType } from '../../../store/modals.store';
import { MarketId } from '../../../types';

export interface FormValues {
  orderAmount: string;
  market: MarketId;
}

const FORM_FIELDS = ['orderAmount', 'market'] as const;
const MIN_ORDER_AMOUNT = 0.01;

export const useDepositModalViewModel = (operation: Tab) => {
  const modalsStore = useModalsStore();
  const isOpen = modalsStore.isOpen(ModalType.Deposit);
  const closeModalHandler = () => modalsStore.close();
  const accountStore = useAccountStore();
  const { address } = useAuthStore();
  const { dDAIBalance, data } = accountStore;
  const buyingPowerUsd = data?.buyingPowerUsd ?? 0;
  const api = useApi();
  const { clearingHouse, getApproves } = useClearingHouse();

  const maxValue = isEqual(Tab.DEPOSIT, operation) ? dDAIBalance.toNumber() : buyingPowerUsd;

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
          clearingHouse.addMargin(AMMS[values.market], new BigNumber(rawAmount.toString()))
        );

        await executeTransactionsBatch(transactionsFunctions);
        await accountStore.loadDDAIBalance(address!);
      });

      actions.setSubmitting(false);
    },
    [api, getApproves, clearingHouse, address, accountStore]
  );

  const formik = useFormik<FormValues>({
    validationSchema: objectSchema().shape({
      market: stringSchema().oneOf([MarketId.AAPL, MarketId.AMD], 'Available options: AAPL, AMD').required(),
      orderAmount: numberSchema().min(MIN_ORDER_AMOUNT).max(maxValue).required()
    }),
    initialValues: { orderAmount: '', market: MarketId.AAPL },
    onSubmit: handleSubmit
  });

  const value = formik.values.orderAmount;
  const market = formik.values.market;
  const error = FORM_FIELDS.map(fieldName => getFormikError(formik, fieldName)).find(Boolean) ?? null;

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = event => {
    formik.setFieldValue(event.target.name, event.target.value, true);
  };

  return {
    market,
    value,
    handleChange,
    error,
    isOpen,
    dDAIBalance,
    closeModalHandler,
    handleSubmit: formik.handleSubmit,
    isSubmitting: formik.isSubmitting,
    values: formik.values
  };
};
