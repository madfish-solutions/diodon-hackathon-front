import { useCallback } from 'react';

import { FormikHelpers, useFormik } from 'formik';
import { object as objectSchema } from 'yup';

import { useHomePageStore } from '@modules/home/hooks';
import { OperationRejectionError } from '@shared/errors';
import { getFormikError, isEmptyArray, isNull, transformMetamaskError } from '@shared/helpers';
import { useToasts } from '@shared/utils/toasts';
import { addressSchema } from '@shared/validators';

export interface SetOwnerFormValues {
  newOwner: string;
}

const OWNER_FORM_VALIDATION_SCHEMA = objectSchema().shape({
  newOwner: addressSchema().nullable(false).required('Required')
});

export const useSetOwnerFormViewModel = () => {
  const { ownerTransactionsContract, ownerContractOwnerStore } = useHomePageStore();
  const { showErrorToast, showInfoToast, showSuccessToast } = useToasts();

  const handleSubmit = useCallback(
    async (values: SetOwnerFormValues, actions: FormikHelpers<SetOwnerFormValues>) => {
      if (isNull(ownerTransactionsContract)) {
        return;
      }

      try {
        actions.setSubmitting(true);
        const response = await ownerTransactionsContract.methods.changeOwner(values.newOwner);
        showInfoToast(`Transaction with hash ${response.hash} is pending`);
        const receipt = await response.wait(1);
        showSuccessToast(`Transaction with hash ${receipt.transactionHash} is successful`);
        actions.resetForm();
        await ownerContractOwnerStore.load();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        const transformedError = transformMetamaskError(e as Error);
        if (!(transformedError instanceof OperationRejectionError)) {
          showErrorToast(transformedError);
        }
      } finally {
        actions.setSubmitting(false);
      }
    },
    [ownerTransactionsContract, showErrorToast, showInfoToast, showSuccessToast, ownerContractOwnerStore]
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

  const errors = Object.fromEntries(Object.keys(formik.errors).map(key => [key, getFormikError(formik, key)]));
  const disabled = formik.isSubmitting || !isEmptyArray(Object.keys(errors));

  return {
    disabled,
    errors,
    handleNewOwnerChange,
    handleSubmit: formik.handleSubmit,
    isSubmitting: formik.isSubmitting,
    values: formik.values
  };
};
