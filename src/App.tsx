import { useCallback, useEffect } from 'react';

import Caver from 'caver-js';
import { observer } from 'mobx-react-lite';

import './App.css';
import { useRootStore } from './providers';
import { ConnectionType } from './shared';

// eslint-disable-next-line sonarjs/cognitive-complexity
export const App = observer(() => {
  const { authStore } = useRootStore();

  const connectKlaytn = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const klaytn = (window as any).klaytn;

    if (!klaytn) {
      alert('Klaytn wallet is not installed or inactive');

      return;
    }

    try {
      const [accountAddress]: string[] = await klaytn.enable();
      authStore.setConnection({
        type: ConnectionType.Klaytn,
        caver: new Caver(klaytn)
      });
      authStore.setAddress(accountAddress);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      alert(`Failed to connect to Klaytn wallet: ${(e as Error).message}`);
    }
  }, [authStore]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const klaytn = (window as any).klaytn;

    if (klaytn) {
      const accountsChangedCallback = ([accountAddress]: string[]) => {
        authStore.setConnection({
          type: ConnectionType.Klaytn,
          caver: new Caver(klaytn)
        });
        authStore.setAddress(accountAddress);
      };

      const networkChangedCallback = (networkId: string) => {
        // eslint-disable-next-line no-console
        console.log('networkChangedCallback', networkId);
        authStore.resetStore();
      };

      klaytn.on('accountsChanged', accountsChangedCallback);
      klaytn.on('networkChanged', networkChangedCallback);

      return () => {
        klaytn.off('accountsChanged', accountsChangedCallback);
        klaytn.off('networkChanged', networkChangedCallback);
      };
    }
  }, [authStore]);

  const signTestMessage = useCallback(async () => {
    const { connection, address } = authStore;

    if (!connection || !address) {
      return;
    }

    if (connection.type === ConnectionType.Klaytn) {
      try {
        const message = 'Hello world';
        const signature = await connection.caver.klay.sign(connection.caver.utils.utf8ToHex(message), address);
        alert(`Signature: ${signature}`);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        alert(`Failed to sign message: ${(e as Error).message}`);
      }
    }
  }, [authStore]);

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
            <button>Connect Ethereum wallet</button>
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
