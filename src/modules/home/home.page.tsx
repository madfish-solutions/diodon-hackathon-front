import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { Button } from '@shared/components';

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
            <Button onClick={disconnect}>Disconnect</Button>
          </>
        ) : (
          <>
            <Button onClick={connectMetamask}>Connect Metamask</Button>
          </>
        )}
      </div>
      {address && (
        <div className="buttons">
          <Button onClick={signTestMessage}>Sign "Hello world" message</Button>
        </div>
      )}
      <p>"Owner" contract owner: {ownerLabel}</p>
      {address ? <SetOwnerForm /> : <p>Connect wallet to interact with "Owner" contract</p>}
    </div>
  );
});
