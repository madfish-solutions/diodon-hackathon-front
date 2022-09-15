import { FC } from 'react';

import { useConnectEthereum } from '@blockchain/use-connect-ethereum';

export const BlockNumber: FC = () => {
  const { blockNumber, isConnected, status } = useConnectEthereum();

  return (
    <div>
      <p>
        <i>Block:</i> {blockNumber}
      </p>
      <p>Connected: {`${isConnected}`}</p>
      <p>Status: {`${status}`}</p>
    </div>
  );
};
