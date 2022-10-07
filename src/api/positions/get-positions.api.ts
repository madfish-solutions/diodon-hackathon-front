import { providers } from 'ethers';

import { ClearingHouseViewerContractWrapper, PNLCalcOption } from '@blockchain/clearing-house-viewer-wrapper';
import { Amm } from '@blockchain/facades/amm';
import { API_URL } from '@config/api';
import { DDAI_DECIMALS, ZERO_AMOUNT } from '@config/constants';
import { AMMS, CLEARING_HOUSE_VIEWER_ADDRESS, KNOWN_MARKETS } from '@config/environment';
import { isExist } from '@shared/helpers';
import { toPercent, toReal, valueToBigNumber } from '@shared/helpers/bignumber';
import { PositionType } from '@shared/types';

import { AccountPositionResponse, IChartData, Position } from './positions.interface';

export const getPositionsApi = async (
  accountPkh: string,
  provider: providers.Web3Provider
): Promise<AccountPositionResponse> => {
  const clearingHouseViewer = new ClearingHouseViewerContractWrapper(CLEARING_HOUSE_VIEWER_ADDRESS, provider);
  const rawPositions = await Promise.all(
    KNOWN_MARKETS.map(async marketId => {
      const amm = AMMS[marketId];
      const ammInstance = new Amm(provider, amm, provider.getSigner());
      const position = Array.from(
        await clearingHouseViewer.methods.getPersonalPositionWithFundingPayment(amm, accountPkh)
      );
      const [rawSize, rawMargin] = position;
      const size = valueToBigNumber(rawSize);
      const margin = toReal(valueToBigNumber(rawMargin), DDAI_DECIMALS);

      if (size.eq(ZERO_AMOUNT)) {
        return null;
      }

      const spotPrice = toReal(await ammInstance.getSpotPrice(), DDAI_DECIMALS);
      const rawPnl = await clearingHouseViewer.methods.getUnrealizedPnl(amm, accountPkh, PNLCalcOption.SPOT_PRICE);
      const pnlUsd = toReal(valueToBigNumber(rawPnl), DDAI_DECIMALS);
      const amountTokens = toReal(size.abs(), DDAI_DECIMALS);
      const amountUsd = amountTokens.times(spotPrice).decimalPlaces(2);
      const pnlPercentage = toPercent(pnlUsd.div(amountUsd));

      return {
        marketId,
        margin: margin.toNumber(),
        type: size.lt(ZERO_AMOUNT) ? PositionType.SHORT : PositionType.LONG,
        amountTokens: amountTokens.toNumber(),
        amountUsd: amountUsd.toNumber(),
        pnlPercent: pnlPercentage.toNumber(),
        pnlUsd: pnlUsd.toNumber(),
        avgOpenPriceUsd: 8,
        liqPrice1Usd: 50,
        liqPrice2Usd: 40
      };
    })
  );

  return {
    accountPkh,
    positions: rawPositions.filter((value): value is Position => isExist(value))
  };
};

export const getMarketPricesApi = async (marketId: string): Promise<Array<IChartData>> => {
  const response = await fetch(`${API_URL}/${marketId.toLowerCase()}/market-prices`);

  return response.json();
};
