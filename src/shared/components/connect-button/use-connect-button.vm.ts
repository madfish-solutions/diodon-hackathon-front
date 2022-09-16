import { useConnectEthereum } from '@blockchain/use-connect-ethereum';

import { useAuthStore } from '../../hooks';

export const useConnectButtonViewModel = () => {
  const { address } = useAuthStore();
  const { connect, disconnect } = useConnectEthereum();

  const disconnectHandle = async () => disconnect();
  const connectHandle = async () => await connect();

  return { address, disconnectHandle, connectHandle };
};
