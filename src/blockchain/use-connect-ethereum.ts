import { useCallback, useEffect } from 'react';

import { useWallet } from '@keshan3262/use-wallet';
import { providers } from 'ethers';

import { CHAIN_ID } from '@config/environment';
import { useAuthStore } from '@shared/hooks';
import { ConnectionType } from '@shared/types';
import { useToasts } from '@shared/utils/toasts';

import { switchChain } from './switch-chain';

export const useConnectEthereum = () => {
  const authStore = useAuthStore();
  const wallet = useWallet();
  const { showErrorToast } = useToasts();
  const { account, chainId, connect, ethereum, reset: disconnect } = wallet;

  const connectEthereum = useCallback(
    async (connectorId?: string) => {
      try {
        return await connect(connectorId);
      } catch (error) {
        showErrorToast(`Failed to connect to Ethereum wallet: ${(error as Error).message}`);
        throw error;
      }
    },
    [connect, showErrorToast]
  );

  useEffect(() => {
    if (account && ethereum && chainId !== CHAIN_ID) {
      (async () => {
        try {
          await switchChain(ethereum);
        } catch (error) {
          showErrorToast((error as Error).message);
          throw error;
        }
      })();
    } else if (account && ethereum) {
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
  }, [account, authStore, chainId, ethereum, showErrorToast]);

  return {
    connect: connectEthereum,
    disconnect
  };
};
