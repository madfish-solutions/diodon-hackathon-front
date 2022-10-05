import { useCallback, useEffect } from 'react';

import { useWallet } from '@keshan3262/use-wallet';
import { Mutex } from 'async-mutex';
import { providers } from 'ethers';

import { CHAIN_ID } from '@config/environment';
import { useAuthStore } from '@shared/hooks';
import { ConnectedStatus, ConnectionType } from '@shared/types';
import { useToasts } from '@shared/utils/toasts';

import { addToken } from './add-token';
import { switchChain } from './switch-chain';

const switchNetworkMutex = new Mutex();

export const useConnectEthereum = () => {
  const { showErrorToast } = useToasts();
  const authStore = useAuthStore();
  const wallet = useWallet();
  const { account, chainId, connect, ethereum, reset: disconnect, isConnected, status } = wallet;
  const chainIdMatches = chainId === CHAIN_ID;

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

  const doAddToken = useCallback(async () => await addToken(ethereum), [ethereum]);

  useEffect(() => {
    if (!account || !ethereum) {
      return authStore.resetStore();
    }

    if (!chainIdMatches) {
      return void switchNetworkMutex.runExclusive(async () => doSwitchChain(ethereum));
    }

    return void doConnect(account, ethereum);
  }, [account, authStore, chainIdMatches, doConnect, doSwitchChain, ethereum, showErrorToast]);

  useEffect(() => {
    authStore.setStatus(status as ConnectedStatus);
  }, [authStore, status]);

  return {
    connect: connectEthereum,
    disconnect: disconnectEthereum,
    isConnected: isConnected(),
    blockNumber: wallet.getBlockNumber?.() ?? null,
    status,
    addToken: doAddToken
  };
};
