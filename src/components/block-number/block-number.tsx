import { FC } from 'react';

import { useWallet } from '@keshan3262/use-wallet';

export const BlockNumber: FC = () => {
  const wallet = useWallet();
  const blockNumber = wallet?.getBlockNumber?.();

  return (
    <div>
      <i>Block:</i> {blockNumber}
    </div>
  );
};
