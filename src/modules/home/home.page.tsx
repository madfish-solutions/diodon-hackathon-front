import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { SetOwnerForm } from './forms/set-owner-form';
import { useHomePageViewModel } from './home-page.vm';

export const HomePage: FC = observer(() => {
  const { address, connectMetamask, disconnect, isInitialized, ownerLabel, signTestMessage } = useHomePageViewModel();

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

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
            <button onClick={connectMetamask}>Connect Metamask</button>
          </>
        )}
      </div>
      {address && (
        <div className="buttons">
          <button onClick={signTestMessage}>Sign "Hello world" message</button>
        </div>
      )}
      <p>"Owner" contract owner: {ownerLabel}</p>
      {address ? <SetOwnerForm /> : <p>Connect wallet to interact with "Owner" contract</p>}
    </div>
  );
});
