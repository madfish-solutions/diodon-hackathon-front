import { useConnectEthereum } from '@blockchain/use-connect-ethereum';

import { useAuthStore } from '../../hooks';

export const useConnectButtonViewModel = () => {
  const metamaskInstalled = window.ethereum?.isMetaMask ?? false;

  const { address } = useAuthStore();
  const { connect, disconnect } = useConnectEthereum();

  const disconnectHandle = async () => disconnect();
  const connectHandle = async () => await connect();

  return { address, disconnectHandle, connectHandle, metamaskInstalled };
};
