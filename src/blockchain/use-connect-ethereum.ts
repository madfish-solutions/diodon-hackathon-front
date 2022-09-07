import { useCallback, useEffect } from 'react';

import { useWallet } from '@keshan3262/use-wallet';
import { providers } from 'ethers';

import { useAuthStore } from '@shared/hooks';
import { ConnectionType } from '@shared/types';
import { useToasts } from '@shared/utils/toasts';

export const useConnectEthereum = () => {
  const authStore = useAuthStore();
  const wallet = useWallet();
  const { showErrorToast } = useToasts();
  const { account, connect, ethereum, reset: disconnect } = wallet;

  const connectEthereum = useCallback(
    async (connectorId?: string) => {
      try {
        await connect(connectorId);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        showErrorToast(`Failed to connect to Ethereum wallet: ${(e as Error).message}`);
      }
    },
    [connect, showErrorToast]
  );

  useEffect(() => {
    if (account && ethereum) {
      const provider = new providers.Web3Provider(ethereum);
      authStore.setAddress(account);
      authStore.setConnection({
        type: ConnectionType.Ethereum,
        provider,
        signer: provider.getSigner()
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
