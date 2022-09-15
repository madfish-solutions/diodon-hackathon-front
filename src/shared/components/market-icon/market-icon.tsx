import { FC } from 'react';

import { IconProps, MarketId } from '../../types';
import { AmdLogo, AppleLogo, ShopifyLogo } from '../icons';

interface Props extends IconProps {
  marketId: MarketId;
}

export const MarketIcon: FC<Props> = ({ marketId, ...props }) => {
  switch (marketId) {
    case MarketId.AMD:
      return <AmdLogo {...props} />;
    case MarketId.APPL:
      return <AppleLogo {...props} />;
    case MarketId.SHOP:
      return <ShopifyLogo {...props} />;
    default:
      return null;
  }
};
