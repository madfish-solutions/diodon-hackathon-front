import { useMemo } from 'react';

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
          showErrorToast(error as Error);
          throw error;
        }
      }
    }),
    [showErrorToast, showSuccessToast]
  );
};
