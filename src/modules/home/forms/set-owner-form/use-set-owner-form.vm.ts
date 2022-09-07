import { useCallback } from 'react';

import { utils } from 'ethers';
import { FormikHelpers, useFormik } from 'formik';
import { object as objectSchema, string as stringSchema } from 'yup';

import { useHomePageStore } from '@modules/home/hooks';
import { getFormikError, hasFormikError, isExist, isNull } from '@shared/helpers';
import { useToasts } from '@shared/utils/toasts';

export interface SetOwnerFormValues {
  newOwner: string;
}

const OWNER_FORM_VALIDATION_SCHEMA = objectSchema().shape({
  newOwner: stringSchema()
    .test('is-address', 'Invalid address or name', value => {
      if (!isExist(value)) {
        return true;
      }

      // eslint-disable-next-line no-console
      console.log('x1', value, utils.isAddress(value), utils.isValidName(value));

      return utils.isAddress(value) || utils.isValidName(value);
    })
    .nullable(false)
    .required('Required')
});

export const useSetOwnerFormViewModel = () => {
  const { ownerTransactionsContract } = useHomePageStore();
  const { showErrorToast, showInfoToast, showSuccessToast } = useToasts();

  const handleSubmit = useCallback(
    async (values: SetOwnerFormValues, actions: FormikHelpers<SetOwnerFormValues>) => {
      if (isNull(ownerTransactionsContract)) {
        return;
      }

      try {
        actions.setSubmitting(true);
        const response = await ownerTransactionsContract.changeOwner(values.newOwner);
        showInfoToast(`Transaction with hash ${response.hash} is pending`);
        const receipt = await response.wait(1);
        showSuccessToast(`Transaction with hash ${receipt.transactionHash} is successful`);
        actions.resetForm();
      } catch (e) {
        showErrorToast(e as Error);
      } finally {
        actions.setSubmitting(false);
      }
    },
    [ownerTransactionsContract, showErrorToast, showInfoToast, showSuccessToast]
  );

  const formik = useFormik({
    validationSchema: OWNER_FORM_VALIDATION_SCHEMA,
    initialValues: { newOwner: '' },
    onSubmit: handleSubmit
  });

  const handleNewOwnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('newOwner', e.target.value);
  };

  if (isNull(ownerTransactionsContract)) {
    return null;
  }

  const disabled = formik.isSubmitting || hasFormikError(formik.errors);
  const errors = Object.fromEntries(Object.keys(formik.errors).map(key => [key, getFormikError(formik, key)]));

  return {
    disabled,
    errors,
    handleNewOwnerChange,
    handleSubmit: formik.handleSubmit,
    isSubmitting: formik.isSubmitting
  };
};
