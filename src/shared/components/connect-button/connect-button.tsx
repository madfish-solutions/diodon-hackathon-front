import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { shortize } from '@shared/helpers/shortize';

import { Button } from '../button';
import { useConnectButtonViewModel } from './use-connect-button.vm';

interface Props {
  className?: string;
}

export const ConnectButton: FC<Props> = observer(({ className }) => {
  const { address, disconnectHandle, connectHandle } = useConnectButtonViewModel();

  return address ? (
    <>
      <Button onClick={disconnectHandle} className={className}>
        <span style={{ color: '#fff' }}>{shortize(address)}</span>
      </Button>
    </>
  ) : (
    <>
      <Button onClick={connectHandle} className={className}>
        Connect Metamask
      </Button>
    </>
  );
});
