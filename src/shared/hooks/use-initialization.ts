import { useEffect, useState } from 'react';

export const useStoreInitialization = (initializationFn: () => Promise<void>) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await initializationFn();
      } finally {
        setIsInitialized(true);
      }
    })();
  }, [initializationFn]);

  return isInitialized;
};
