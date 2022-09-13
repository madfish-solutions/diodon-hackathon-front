import { FC } from 'react';

import { MarketData } from '@api/markets';

interface Props {
  market: MarketData;
}

export const MarketItem: FC<Props> = ({ market }) => {
  return (
    <div>
      <b>{market.marketId}</b>
    </div>
  );
};
