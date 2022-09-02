import { useCallback } from 'react';

import { providers } from 'ethers';
import { observer } from 'mobx-react-lite';

import { useConnectEthereum } from '@blockchain/use-connect-ethereum';
import { useConnectKlaytn } from '@blockchain/use-connect-klaytn';

import './App.css';
import { useRootStore } from './providers';
import { ConnectionType } from './shared';

// eslint-disable-next-line sonarjs/cognitive-complexity
export const App = observer(() => {
  const { authStore } = useRootStore();

  const connectEthereum = useConnectEthereum();
  const connectKlaytn = useConnectKlaytn();

  const signTestMessage = useCallback(async () => {
    const { connection, address } = authStore;

    if (!connection || !address) {
      return;
    }

    try {
      const message = 'Hello world';
      let signature = '';
      if (connection.type === ConnectionType.Klaytn) {
        signature = await connection.caver.klay.sign(connection.caver.utils.utf8ToHex(message), address);
      } else {
        const provider = new providers.Web3Provider(connection.ethereum);
        const signer = provider.getSigner();
        signature = await signer.signMessage(message);
      }
      alert(`Signature: ${signature}`);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      alert(`Failed to sign message: ${(e as Error).message}`);
    }
  }, [authStore]);

  const connectMetamask = useCallback(async () => await connectEthereum(), [connectEthereum]);
  const connectWithWalletConnect = useCallback(async () => await connectEthereum('walletconnect'), [connectEthereum]);

  return (
    <div className="rows">
      <div className="buttons">
        {authStore.address ? (
          <>
            <span>{authStore.address}</span>
            <button>Disconnect</button>
          </>
        ) : (
          <>
            <button onClick={connectKlaytn}>Connect Klaytn wallet</button>
            <button onClick={connectMetamask}>Connect Metamask</button>
            <button onClick={connectWithWalletConnect}>Connect with Wallet Connect</button>
          </>
        )}
      </div>
      {authStore.address && (
        <div className="buttons">
          <button onClick={signTestMessage}>Sign "Hello world" message</button>
        </div>
      )}
    </div>
  );
});
