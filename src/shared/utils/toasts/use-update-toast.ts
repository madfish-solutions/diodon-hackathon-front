import { useCallback, useRef } from 'react';

import { UpdateOptions, toast } from 'react-toastify';

const DEFAULT_AUTOCLOSE_TIMER = 15000;

export const useUpdateToast = () => {
  const toastIdRef = useRef<string | number>();

  return useCallback(
    ({ type, render, progress, autoClose = DEFAULT_AUTOCLOSE_TIMER, ...restOptions }: UpdateOptions) => {
      const creationFn = type && type !== 'default' ? toast[type] : toast;

      if (toastIdRef.current && toast.isActive(toastIdRef.current)) {
        toast.update(toastIdRef.current, {
          render,
          type,
          progress,
          autoClose,
          ...restOptions
        });
      } else {
        toastIdRef.current = creationFn(render);
      }
    },
    []
  );
};
