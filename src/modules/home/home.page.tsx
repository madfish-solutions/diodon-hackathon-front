import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { Button, ConnectButton } from '@shared/components';

import { SetOwnerForm } from './forms/set-owner-form';
import { useHomePageViewModel } from './home-page.vm';

export const HomePage: FC = observer(() => {
  const { address, isInitialized, ownerLabel, signTestMessage } = useHomePageViewModel();

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rows">
      <div className="buttons">
        <ConnectButton />
      </div>
      {address && (
        <div className="buttons">
          <Button onClick={signTestMessage}>Sign "Hello world" message!</Button>
        </div>
      )}
      <p>"Owner" contract owner: {ownerLabel}</p>
      {address ? <SetOwnerForm /> : <p>Connect wallet to interact with "Owner" contract</p>}
    </div>
  );
});
