import { providers } from 'ethers';

import { Amm } from '@blockchain/facades/amm';
import { MARKETS_API_URL } from '@config/api';
import { DDAI_DECIMALS } from '@config/constants';
import { AMMS } from '@config/environment';
import { toReal } from '@shared/helpers/bignumber';

import { MarketData } from './markets.interface';

export const getMarketsApi = async (
  provider: providers.Web3Provider | providers.JsonRpcProvider
): Promise<MarketData[]> => {
  const response = await fetch(MARKETS_API_URL);

  const partialMarketData: MarketData[] = await response.json();

  return Promise.all(
    partialMarketData.map(async marketData => {
      const amm = new Amm(provider, AMMS[marketData.marketId], provider.getSigner());

      return {
        ...marketData,
        marketPriceUsd: (await amm.getSpotPrice()).toFixed(),
        indexPriceUsd: toReal(await amm.getUnderlyingPrice(), DDAI_DECIMALS).toNumber()
      };
    })
  );
};
