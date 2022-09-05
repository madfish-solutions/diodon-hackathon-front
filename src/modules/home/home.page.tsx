import { FC } from 'react';

import { useHomeViewModel } from './use-home.vm';

export const HomePage: FC = () => {
  const { address, connectKlaytn, connectMetamask, disconnect, signTestMessage } = useHomeViewModel();

  return (
    <div className="rows">
      <div className="buttons">
        {address ? (
          <>
            <span>{address}</span>
            <button onClick={disconnect}>Disconnect</button>
          </>
        ) : (
          <>
            <button onClick={connectKlaytn}>Connect Klaytn wallet</button>
            <button onClick={connectMetamask}>Connect Metamask</button>
          </>
        )}
      </div>
      {address && (
        <div className="buttons">
          <button onClick={signTestMessage}>Sign "Hello world" message</button>
        </div>
      )}
    </div>
  );
};
