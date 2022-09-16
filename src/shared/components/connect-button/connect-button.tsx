import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { Button } from '../button';
import { useConnectButtonViewModel } from './use-connect-button.vm';

export const ConnectButton: FC = observer(() => {
  const { address, disconnectHandle, connectHandle } = useConnectButtonViewModel();

  return address ? (
    <>
      <span style={{ marginRight: 8, opacity: 0.5, fontSize: '80%', color: '#fff' }}>{address}</span>
      <Button onClick={disconnectHandle}>Disconnect</Button>
    </>
  ) : (
    <>
      <Button onClick={connectHandle}>Connect Metamask</Button>
    </>
  );
});
