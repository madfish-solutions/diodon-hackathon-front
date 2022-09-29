import { ChangeEventHandler, useCallback, useEffect } from 'react';

import BigNumber from 'bignumber.js';
import { BigNumber as EthersBigNumber } from 'ethers';
import { FormikHelpers, useFormik } from 'formik';
import { number as numberSchema, object as objectSchema, string as stringSchema } from 'yup';

import { executeTransactionsBatch } from '@blockchain/execute-transactions-batch';
import { useClearingHouse } from '@blockchain/hooks/use-clearing-house';
import { DDAI_DECIMALS } from '@config/constants';
import { AMMS, KNOWN_MARKETS } from '@config/environment';
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

export const useFinOperationModalViewModel = (operation: Tab) => {
  const modalsStore = useModalsStore();
  const isOpen = modalsStore.isOpen(ModalType.Deposit) || modalsStore.isOpen(ModalType.Withdraw);
  const closeModalHandler = () => modalsStore.close();
  const accountStore = useAccountStore();
  const { address } = useAuthStore();
  const { dDAIBalance, freeCollateral } = accountStore;
  const api = useApi();
  const { clearingHouse, getApproves } = useClearingHouse();

  const maxValue = isEqual(Tab.DEPOSIT, operation)
    ? dDAIBalance.decimalPlaces(2, BigNumber.ROUND_DOWN).toNumber()
    : freeCollateral.decimalPlaces(2, BigNumber.ROUND_DOWN).toNumber();

  const handleSubmit = useCallback(
    async (values: FormValues, actions: FormikHelpers<FormValues>) => {
      actions.setSubmitting(true);

      await api.call(async () => {
        const rawAmount = EthersBigNumber.from(toAtomic(new BigNumber(values.orderAmount), DDAI_DECIMALS).toFixed());

        if (!clearingHouse) {
          throw new Error('Clearing house is not defined');
        }

        if (isEqual(Tab.DEPOSIT, operation)) {
          const transactionsFunctions = await getApproves(rawAmount);

          transactionsFunctions.push(async () =>
            clearingHouse.addMargin(AMMS[values.market], new BigNumber(rawAmount.toString()))
          );

          await executeTransactionsBatch(transactionsFunctions);
          await accountStore.loadDDAIBalance(address!);
        } else {
          const transactionsFunctions = [
            async () => clearingHouse.removeMargin(AMMS[values.market], new BigNumber(rawAmount.toString()))
          ];

          await executeTransactionsBatch(transactionsFunctions);
          await accountStore.loadFreeCollateral(AMMS[values.market], address!);
        }
      });

      actions.setSubmitting(false);
    },
    [api, getApproves, clearingHouse, address, accountStore, operation]
  );

  const formik = useFormik<FormValues>({
    validationSchema: objectSchema().shape({
      market: stringSchema().oneOf(KNOWN_MARKETS, 'Must be one of markets in the list').required(),
      orderAmount: numberSchema().min(MIN_ORDER_AMOUNT).max(maxValue).required()
    }),
    initialValues: { orderAmount: '', market: MarketId.AAPL },
    onSubmit: handleSubmit
  });

  const value = formik.values.orderAmount;
  const market = formik.values.market;
  const error = FORM_FIELDS.map(fieldName => getFormikError(formik, fieldName)).find(Boolean) ?? null;

  useEffect(() => {
    if (address && operation === Tab.WITHDRAW) {
      api.call(async () => accountStore.loadFreeCollateral(AMMS[market], address));
    }
  }, [accountStore, api, operation, address, market]);

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = event => {
    formik.setFieldValue(event.target.name, event.target.value, true);
  };

  return {
    market,
    value,
    handleChange,
    error,
    isOpen,
    maxValue,
    closeModalHandler,
    handleSubmit: formik.handleSubmit,
    isSubmitting: formik.isSubmitting,
    values: formik.values
  };
};
