import BigNumber from 'bignumber.js';
import { BigNumber as EthersBigNumber, providers } from 'ethers';

import { ClearingHouseViewerContractWrapper, PNLCalcOption } from '@blockchain/clearing-house-viewer-wrapper';
import { ClearingHouse } from '@blockchain/facades';
import { Amm } from '@blockchain/facades/amm';
import { API_URL } from '@config/api';
import { DDAI_DECIMALS, WHOLE_PERCENTAGE, ZERO_AMOUNT } from '@config/constants';
import { AMMS, CLEARING_HOUSE_ADDRESS, CLEARING_HOUSE_VIEWER_ADDRESS, KNOWN_MARKETS } from '@config/environment';
import { isExist } from '@shared/helpers';
import { toPercent, toReal, valueToBigNumber } from '@shared/helpers/bignumber';
import { PositionType } from '@shared/types';

import { AccountPositionResponse, IChartData, Position } from './positions.interface';

function getLiquidationPrice(maintenanceMarginRatio: BigNumber, position: (EthersBigNumber | [EthersBigNumber])[]) {
  const [size, margin, openNotional] = position.map(value => valueToBigNumber(value));

  if (size.gt(0)) {
    return openNotional.minus(margin).div(size.times(new BigNumber(1).minus(maintenanceMarginRatio)));
  }

  return openNotional.plus(margin).div(size.abs().times(new BigNumber(1).plus(maintenanceMarginRatio)));
}

export const getPositionsApi = async (
  accountPkh: string,
  provider: providers.Web3Provider
): Promise<AccountPositionResponse> => {
  const clearingHouseViewer = new ClearingHouseViewerContractWrapper(CLEARING_HOUSE_VIEWER_ADDRESS, provider);
  const clearingHouse = new ClearingHouse(provider, CLEARING_HOUSE_ADDRESS, provider.getSigner());
  const maintenanceMarginRatio = toReal(await clearingHouse.getMaintenanceMarginRatio(), DDAI_DECIMALS);
  const partialLiqRatio = toReal(await clearingHouse.getPartialLiquidationRatio(), DDAI_DECIMALS);
  const liquidationFeeRatio = toReal(await clearingHouse.getLiquidationFeeRatio(), DDAI_DECIMALS);
  const rawPositions = await Promise.all(
    KNOWN_MARKETS.map(async marketId => {
      const amm = AMMS[marketId];
      const ammInstance = new Amm(provider, amm, provider.getSigner());
      const position = Array.from(
        await clearingHouseViewer.methods.getPersonalPositionWithFundingPayment(amm, accountPkh)
      );
      const [rawSize, rawMargin, rawOpenNotional] = position;
      const size = valueToBigNumber(rawSize);
      const margin = toReal(valueToBigNumber(rawMargin), DDAI_DECIMALS);
      const avgOpenPriceUsd = valueToBigNumber(rawOpenNotional).div(size).abs().decimalPlaces(2).toNumber();

      if (size.eq(ZERO_AMOUNT)) {
        return null;
      }

      const spotPrice = toReal(await ammInstance.getSpotPrice(), DDAI_DECIMALS);
      const rawPnl = await clearingHouseViewer.methods.getUnrealizedPnl(amm, accountPkh, PNLCalcOption.SPOT_PRICE);
      const pnlUsd = toReal(valueToBigNumber(rawPnl), DDAI_DECIMALS);
      const amountTokens = toReal(size.abs(), DDAI_DECIMALS);
      const amountUsd = amountTokens.times(spotPrice).decimalPlaces(2);
      const pnlPercentage = toPercent(pnlUsd.div(amountUsd));
      const marginRatio = toReal(
        valueToBigNumber(await clearingHouseViewer.methods.getMarginRatio(amm, accountPkh)),
        DDAI_DECIMALS
      );

      const partialLiqPriceUsd = getLiquidationPrice(maintenanceMarginRatio, position).toNumber();
      const fullLiqPriceUsd = partialLiqRatio.eq(1)
        ? partialLiqPriceUsd
        : getLiquidationPrice(liquidationFeeRatio, position).toNumber();

      return {
        marketId,
        margin: margin.toNumber(),
        type: size.lt(ZERO_AMOUNT) ? PositionType.SHORT : PositionType.LONG,
        amountTokens: amountTokens.toNumber(),
        amountUsd: amountUsd.toNumber(),
        pnlPercent: pnlPercentage.toNumber(),
        pnlUsd: pnlUsd.toNumber(),
        avgOpenPriceUsd,
        liqPrice1Usd: partialLiqPriceUsd,
        liqPrice2Usd: fullLiqPriceUsd,
        marginRatioPercentage: marginRatio.times(WHOLE_PERCENTAGE).decimalPlaces(1).toNumber(),
        leverage: marginRatio.gt(0) ? new BigNumber(1).div(marginRatio).decimalPlaces(2).toNumber() : Infinity
      };
    })
  );

  return {
    accountPkh,
    positions: rawPositions.filter((value): value is Position => isExist(value))
  };
};

export const getMarketPricesApi = async (
  marketId: string
): Promise<{
  volumeData: Array<IChartData>;
  spotPriceData: Array<IChartData>;
}> => {
  const response = await fetch(`${API_URL}/${marketId.toLowerCase()}/market-prices`);

  return await response.json();
};
