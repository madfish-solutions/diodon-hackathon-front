import { FC, HTMLProps } from 'react';

import { observer } from 'mobx-react-lite';

import { shortize } from '@shared/helpers/shortize';

import { Button } from '../button';
import { useConnectButtonViewModel } from './use-connect-button.vm';

interface Props extends HTMLProps<HTMLButtonElement> {
  className?: string;
}

export const ConnectButton: FC<Props> = observer(({ className, ...props }) => {
  const { address, disconnectHandle, connectHandle, metamaskInstalled } = useConnectButtonViewModel();

  if (address) {
    return (
      // @ts-ignore
      <Button onClick={disconnectHandle} className={className} {...props}>
        🦊 <span style={{ color: '#fff' }}>{shortize(address)}</span>
      </Button>
    );
  }

  if (metamaskInstalled) {
    return (
      // @ts-ignore
      <Button onClick={connectHandle} className={className} {...props}>
        🦊 Connect Metamask
      </Button>
    );
  }

  return (
    // @ts-ignore
    <Button href="https://metamask.io/" target="_blank" className={className} {...props}>
      🦊 Install Metamask
    </Button>
  );
});
