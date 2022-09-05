import { useCallback } from 'react';

import { providers } from 'ethers';

import { useConnectEthereum } from '@blockchain/use-connect-ethereum';
import { useConnectKlaytn } from '@blockchain/use-connect-klaytn';
import { useRootStore } from '@providers/root-store.provider';
import { ConnectionType } from '@shared/types';

const TEST_MESSAGE = 'Hello, World!';

export const useHomeViewModel = () => {
  const { authStore } = useRootStore();
  const { connection, address } = authStore;

  const { connect: connectEthereum, disconnect: disconnectEthereum } = useConnectEthereum();
  const connectKlaytn = useConnectKlaytn();

  const signTestMessage = useCallback(async () => {
    if (!connection || !address) {
      return;
    }

    try {
      let signature = '';
      if (connection.type === ConnectionType.Klaytn) {
        signature = await connection.caver.klay.sign(connection.caver.utils.utf8ToHex(TEST_MESSAGE), address);
      } else {
        const provider = new providers.Web3Provider(connection.ethereum);
        const signer = provider.getSigner();
        signature = await signer.signMessage(TEST_MESSAGE);
      }
      alert(`Signature: ${signature}`);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      alert(`Failed to sign message: ${(e as Error).message}`);
    }
  }, [connection, address]);

  const connectMetamask = useCallback(async () => await connectEthereum(), [connectEthereum]);

  const disconnect = useCallback(async () => {
    if (!connection) {
      return;
    }

    if (connection.type === ConnectionType.Klaytn) {
      authStore.resetStore();
    } else {
      disconnectEthereum();
    }
  }, [disconnectEthereum, connection, authStore]);

  return {
    address: authStore.address,
    connectKlaytn,
    connectMetamask,
    disconnect,
    signTestMessage
  };
};
