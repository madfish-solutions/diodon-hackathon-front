import { useCallback, useMemo, useState } from 'react';

import BigNumber from 'bignumber.js';
import { debounce } from 'throttle-debounce';

import { Amm } from '@blockchain/facades/amm';
import { Dir } from '@blockchain/facades/types';
import { BN_ZERO_AMOUNT, DDAI_DECIMALS, WHOLE_PERCENTAGE } from '@config/constants';
import { toAtomic, toReal } from '@shared/helpers/bignumber';

import { PositionType } from '../types/position-type.enum';
import { Nullable } from '../types/types';
import { useApi } from './use-api';

interface Order {
  orderAmount: string;
  positionType: PositionType;
  leverage: number;
}

const SLIPPAGE_PERCENTAGE = 3;

export const getPositionLimitWithSlippage = (noSlippageSize: BigNumber, positionType: PositionType) => {
  if (positionType === PositionType.LONG) {
    return new BigNumber(noSlippageSize).times(WHOLE_PERCENTAGE - SLIPPAGE_PERCENTAGE).div(WHOLE_PERCENTAGE);
  }

  return new BigNumber(noSlippageSize).times(WHOLE_PERCENTAGE + SLIPPAGE_PERCENTAGE).div(WHOLE_PERCENTAGE);
};

export const getNoSlippagePositionLimit = async (
  amm: Nullable<Amm>,
  atomicCollateral: BigNumber,
  positionType: PositionType,
  leverage: number
) => {
  if (!atomicCollateral.isFinite() || atomicCollateral.eq(BN_ZERO_AMOUNT) || !amm) {
    return BN_ZERO_AMOUNT;
  }

  const notional = atomicCollateral.times(leverage).integerValue(BigNumber.ROUND_DOWN);

  return await amm.getInputPrice(positionType === PositionType.LONG ? Dir.AddToAmm : Dir.RemoveFromAmm, notional);
};

export const useAddedPositionLimit = (order: Order, amm: Nullable<Amm>) => {
  const api = useApi();
  const [noSlippagePositionLimit, setNoSlippagePositionSize] = useState(BN_ZERO_AMOUNT);

  const localGetNoSlippagePositionSize = useCallback(
    async (atomicCollateral: BigNumber, positionType: PositionType, leverage: number) => {
      return api.call(async () => getNoSlippagePositionLimit(amm, atomicCollateral, positionType, leverage));
    },
    [amm, api]
  );

  const updatePositionLimit = useMemo(
    () =>
      debounce(100, async () => {
        try {
          const rawPositionSize = await localGetNoSlippagePositionSize(
            toAtomic(new BigNumber(order.orderAmount), DDAI_DECIMALS),
            order.positionType,
            order.leverage
          );

          const realPositionSize = toReal(rawPositionSize, DDAI_DECIMALS).decimalPlaces(6, BigNumber.ROUND_DOWN);
          setNoSlippagePositionSize(realPositionSize);
        } finally {
          // do nothing
        }
      }),
    [localGetNoSlippagePositionSize, order]
  );

  const positionLimit = useMemo(() => {
    return getPositionLimitWithSlippage(new BigNumber(noSlippagePositionLimit), order.positionType);
  }, [noSlippagePositionLimit, order.positionType]);

  return {
    noSlippagePositionLimit,
    positionLimit,
    updatePositionLimit
  };
};
