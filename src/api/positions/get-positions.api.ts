import { providers } from 'ethers';

import { ClearingHouseViewerContractWrapper, PNLCalcOption } from '@blockchain/clearing-house-viewer-wrapper';
import { Amm } from '@blockchain/facades/amm';
import { DDAI_DECIMALS, ZERO_AMOUNT } from '@config/constants';
import { AMMS, CLEARING_HOUSE_VIEWER_ADDRESS, KNOWN_MARKETS } from '@config/environment';
import { isExist } from '@shared/helpers';
import { toPercent, toReal, valueToBigNumber } from '@shared/helpers/bignumber';
import { PositionType } from '@shared/types';

import { AccountPositionResponse, Position } from './positions.interface';

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [rawSize] = position;
      // eslint-disable-next-line no-console
      const size = valueToBigNumber(rawSize);

      if (size.eq(ZERO_AMOUNT)) {
        return null;
      }

      const spotPrice = await ammInstance.getSpotPrice();
      const rawPnl = await clearingHouseViewer.methods.getUnrealizedPnl(amm, accountPkh, PNLCalcOption.SPOT_PRICE);
      const pnlUsd = toReal(valueToBigNumber(rawPnl), DDAI_DECIMALS);
      const amountTokens = toReal(size.abs(), DDAI_DECIMALS);
      const amountUsd = amountTokens.times(spotPrice).decimalPlaces(2);
      const pnlPercentage = toPercent(pnlUsd.div(amountUsd));

      return {
        marketId,
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
