import { useCallback, useEffect } from 'react';

import { useWallet } from '@keshan3262/use-wallet';

import { RPC_URL } from '@config/environment';
import { useRootStore } from '@providers/root-store.provider';
import { ConnectionType } from '@shared/types';

export const useConnectEthereum = () => {
  const { authStore } = useRootStore();
  const wallet = useWallet();
  const { account, connect, ethereum, reset: disconnect } = wallet;
  // eslint-disable-next-line no-console
  console.log(RPC_URL);

  const connectEthereum = useCallback(
    async (connectorId?: string) => {
      try {
        await connect(connectorId);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        alert(`Failed to connect to Ethereum wallet: ${(e as Error).message}`);
      }
    },
    [connect]
  );

  useEffect(() => {
    if (account && ethereum) {
      authStore.setAddress(account);
      authStore.setConnection({
        type: ConnectionType.Ethereum,
        ethereum
      });
    } else {
      authStore.resetStore();
    }
  }, [account, authStore, ethereum]);

  return {
    connect: connectEthereum,
    disconnect
  };
};
