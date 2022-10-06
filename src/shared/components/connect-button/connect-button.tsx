import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { shortize } from '@shared/helpers/shortize';

import { Button } from '../button';
import { useConnectButtonViewModel } from './use-connect-button.vm';

interface Props {
  className?: string;
}

export const ConnectButton: FC<Props> = observer(({ className }) => {
  const { address, disconnectHandle, connectHandle, metamaskInstalled } = useConnectButtonViewModel();

  if (address) {
    return (
      <Button onClick={disconnectHandle} className={className}>
        <span style={{ color: '#fff' }}>{shortize(address)}</span>
      </Button>
    );
  }

  if (metamaskInstalled) {
    return (
      <Button onClick={connectHandle} className={className}>
        Connect Metamask
      </Button>
    );
  }

  return (
    <Button href="https://metamask.io/" target="_blank" className={className}>
      Install Metamask
    </Button>
  );
});
