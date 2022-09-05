import { useCallback } from 'react';

import { ToastContent, UpdateOptions } from 'react-toastify';

import { useUpdateToast } from './use-update-toast';

export interface UseToasts {
  updateToast: ({ type, render, progress, autoClose, ...restOptions }: UpdateOptions) => void;
  showErrorToast: (error: Error | string) => void;
  showSuccessToast: (render: ToastContent) => void;
  showInfoToast: (render: ToastContent) => void;
}

export const useToasts = (): UseToasts => {
  const updateToast = useUpdateToast();

  const showErrorToast = useCallback(
    (error: Error | string) => {
      if (typeof error === 'string') {
        updateToast({
          type: 'error',
          render: error
        });

        return;
      }

      if (error instanceof Error) {
        updateToast({
          type: 'error',
          render: `${error.name}: ${error.message}`
        });

        return;
      }

      const errorMessage = `${JSON.stringify(error)}`;
      updateToast({
        type: 'error',
        render: errorMessage
      });
    },
    [updateToast]
  );

  const showInfoToast = useCallback(
    (render: ToastContent) => {
      updateToast({
        type: 'info',
        render
      });
    },
    [updateToast]
  );

  const showSuccessToast = useCallback(
    (render: ToastContent) => {
      updateToast({
        type: 'success',
        render
      });
    },
    [updateToast]
  );

  return {
    updateToast,
    showInfoToast,
    showSuccessToast,
    showErrorToast
  };
};
