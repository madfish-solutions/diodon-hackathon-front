import { useCallback, useEffect } from 'react';

import Caver from 'caver-js';

import { useRootStore } from '@providers/root-store.provider';
import { ConnectionType } from '@shared/types';

export const useConnectKlaytn = () => {
  const { authStore } = useRootStore();

  const connectKlaytn = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const klaytn = (window as any).klaytn;

    if (!klaytn) {
      alert('Klaytn wallet is not installed or inactive');

      return;
    }

    try {
      const [accountAddress]: string[] = await klaytn.enable();
      authStore.setConnection({
        type: ConnectionType.Klaytn,
        caver: new Caver(klaytn)
      });
      authStore.setAddress(accountAddress);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      alert(`Failed to connect to Klaytn wallet: ${(e as Error).message}`);
    }
  }, [authStore]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const klaytn = (window as any).klaytn;

    if (klaytn) {
      const accountsChangedCallback = ([accountAddress]: string[]) => {
        authStore.setConnection({
          type: ConnectionType.Klaytn,
          caver: new Caver(klaytn)
        });
        authStore.setAddress(accountAddress);
      };

      const networkChangedCallback = (networkId: string) => {
        // eslint-disable-next-line no-console
        console.log('networkChangedCallback', networkId);
        authStore.resetStore();
      };

      klaytn.on('accountsChanged', accountsChangedCallback);
      klaytn.on('networkChanged', networkChangedCallback);

      return () => {
        klaytn.off('accountsChanged', accountsChangedCallback);
        klaytn.off('networkChanged', networkChangedCallback);
      };
    }
  }, [authStore]);

  return connectKlaytn;
};
