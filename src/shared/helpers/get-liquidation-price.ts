import BigNumber from 'bignumber.js';

import { ZERO_AMOUNT } from '@config/constants';
import { PNLCalcOption } from '@blockchain/facades';

function getPositionNotionalAndUnrealizedPnl(
  position: BigNumber[],
  pnlCalcOption: PNLCalcOption
) {
  const [positionSize] = position;
  const positionNotional = new BigNumber(ZERO_AMOUNT);
  const unrealizedPnl = new BigNumber(ZERO_AMOUNT);

  Decimal.decimal memory positionSizeAbs = position.size.abs();
  if (positionSizeAbs.toUint() != 0) {
      bool isShortPosition = position.size.toInt() < 0;
      IAmm.Dir dir = isShortPosition ? IAmm.Dir.REMOVE_FROM_AMM : IAmm.Dir.ADD_TO_AMM;
      if (_pnlCalcOption == PnlCalcOption.TWAP) {
          positionNotional = _amm.getOutputTwap(dir, positionSizeAbs);
      } else if (_pnlCalcOption == PnlCalcOption.SPOT_PRICE) {
          positionNotional = _amm.getOutputPrice(dir, positionSizeAbs);
      } else {
          Decimal.decimal memory oraclePrice = _amm.getUnderlyingPrice();
          positionNotional = positionSizeAbs.mulD(oraclePrice);
      }
      // unrealizedPnlForLongPosition = positionNotional - openNotional
      // unrealizedPnlForShortPosition = positionNotionalWhenBorrowed - positionNotionalWhenReturned =
      // openNotional - positionNotional = unrealizedPnlForLongPosition * -1
      unrealizedPnl = isShortPosition
          ? MixedDecimal.fromDecimal(position.openNotional).subD(positionNotional)
          : MixedDecimal.fromDecimal(positionNotional).subD(position.openNotional);
  }

  return {
    positionNotional,
    unrealizedPnl
  };
}

function getPreferencePositionNotionalAndUnrealizedPnl(
  [spotPositionNotional, spotPricePnl]: BigNumber[],
  [twapPositionNotional, twapPricePnl]: BigNumber[]
) {
  return spotPricePnl.gt(twapPricePnl)
    ? {
        unrealizedPnl: spotPricePnl,
        positionNotional: spotPositionNotional
      }
    : {
        unrealizedPnl: twapPricePnl,
        positionNotional: twapPositionNotional
      };
}

function calcRemainMarginWithFundingPayment(
  position: BigNumber[],
  marginDelta: BigNumber,
  latestCumulativePremiumFraction: BigNumber
) {
  const [positionSize, margin, _, prevLastUpdatedCumulativePremiumFraction] = position;
  let remainMargin = new BigNumber(ZERO_AMOUNT);
  let badDebt = new BigNumber(ZERO_AMOUNT);
  let fundingPayment = new BigNumber(ZERO_AMOUNT);

  // calculate funding payment
  if (!positionSize.eq(ZERO_AMOUNT)) {
    fundingPayment = latestCumulativePremiumFraction
      .minus(prevLastUpdatedCumulativePremiumFraction)
      .times(positionSize);
  }

  // calculate remain margin
  const signedRemainMargin = marginDelta.minus(fundingPayment).plus(margin);

  // if remain margin is negative, set to zero and leave the rest to bad debt
  if (signedRemainMargin.lt(ZERO_AMOUNT)) {
    badDebt = signedRemainMargin.abs();
  } else {
    remainMargin = signedRemainMargin.abs();
  }

  return {
    remainMargin,
    badDebt,
    fundingPayment,
    latestCumulativePremiumFraction
  };
}

function getMarginRatioHelper(
  position: BigNumber[],
  unrealizedPnl: BigNumber,
  positionNotional: BigNumber,
  latestCumulativePremiumFraction: BigNumber
) {
  const { remainMargin, badDebt } = calcRemainMarginWithFundingPayment(
    position,
    unrealizedPnl,
    latestCumulativePremiumFraction
  );

  return remainMargin.minus(badDebt).idiv(positionNotional);
}

function getMarginRatio(
  position: BigNumber[],
  spotPositionNotionalAndUnrealizedPnl: BigNumber[],
  twapPositionNotionalAndUnrealizedPnl: BigNumber[],
  latestCumulativePremiumFraction: BigNumber
) {
  const { unrealizedPnl, positionNotional } = getPreferencePositionNotionalAndUnrealizedPnl(
    spotPositionNotionalAndUnrealizedPnl,
    twapPositionNotionalAndUnrealizedPnl
  );

  return getMarginRatioHelper(position, unrealizedPnl, positionNotional, latestCumulativePremiumFraction);
}
