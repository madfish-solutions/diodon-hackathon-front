import { useCallback, useEffect } from 'react';

import { useWallet } from '@keshan3262/use-wallet';
import { providers } from 'ethers';

import { CHAIN_ID } from '@config/environment';
import { useAuthStore } from '@shared/hooks';
import { ConnectionType } from '@shared/types';
import { useToasts } from '@shared/utils/toasts';

import { switchChain } from './switch-chain';

export const useConnectEthereum = () => {
  const { showErrorToast } = useToasts();
  const authStore = useAuthStore();
  const wallet = useWallet();
  const { account, chainId, connect, ethereum, reset: disconnect, isConnected, status } = wallet;

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

  const disconnectEthereum = useCallback(async () => {
    disconnect();
  }, [disconnect]);

  const doSwitchChain = useCallback(
    async (_ethereum: providers.ExternalProvider) => {
      try {
        await switchChain(_ethereum);
      } catch (error) {
        showErrorToast((error as Error).message);
        throw error;
      }
    },
    [showErrorToast]
  );

  const doConnect = useCallback(
    async (_account: string, _ethereum: providers.ExternalProvider) => {
      const provider = new providers.Web3Provider(_ethereum);
      authStore.setAddress(_account);
      authStore.setConnection({
        type: ConnectionType.Ethereum,
        provider,
        signer: provider.getSigner()
      });
    },
    [authStore]
  );

  useEffect(() => {
    if (!account || !ethereum) {
      return authStore.resetStore();
    }

    if (chainId !== CHAIN_ID) {
      return void doSwitchChain(ethereum);
    }

    return void doConnect(account, ethereum);
  }, [account, authStore, chainId, doConnect, doSwitchChain, ethereum, showErrorToast]);

  return {
    connect: connectEthereum,
    disconnect: disconnectEthereum,
    isConnected: isConnected(),
    blockNumber: wallet.getBlockNumber?.() ?? null,
    status
  };
};
