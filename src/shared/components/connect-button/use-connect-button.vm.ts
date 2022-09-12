import { useConnectEthereum } from '@blockchain/use-connect-ethereum';

import { useAuthStore } from '../../hooks';

export const useConnectButtonViewModel = () => {
  const { connection, address } = useAuthStore();
  const { connect, disconnect } = useConnectEthereum();

  // eslint-disable-next-line no-console
  console.log('x', { connection, address });

  const disconnectHandle = () => disconnect();
  const connectHandle = async () => await connect();

  return { address, disconnectHandle, connectHandle };
};
