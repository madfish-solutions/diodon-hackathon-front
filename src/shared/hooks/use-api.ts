import { useMemo } from 'react';

import { transformMetamaskError } from '@shared/helpers';

import { useToasts } from '../utils/toasts';

export const useApi = () => {
  const { showSuccessToast, showErrorToast } = useToasts();

  return useMemo(
    () => ({
      call: async <T>(api: () => Promise<T>, successMessage?: string) => {
        try {
          const result = await api();
          if (successMessage) {
            showSuccessToast(successMessage);
          }

          return result;
        } catch (error) {
          const prettyError = transformMetamaskError(error as Error);
          showErrorToast(prettyError);
          throw prettyError;
        }
      }
    }),
    [showErrorToast, showSuccessToast]
  );
};
