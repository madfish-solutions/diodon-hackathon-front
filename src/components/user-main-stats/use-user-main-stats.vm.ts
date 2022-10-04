import { useMemo } from 'react';

import { getSumOfNumbers } from '@shared/helpers/bignumber';
import { usePositionsStore } from '@shared/hooks';

export const useUserMainStatsViewModel = () => {
  const { positions } = usePositionsStore();

  return useMemo(() => {
    const netCollateral = getSumOfNumbers(positions.map(position => position.margin)).toNumber();
    const openedPositionsSum = getSumOfNumbers(positions.map(position => position.amountUsd)).toNumber();

    return {
      netCollateral,
      netCollateralUsd: netCollateral,
      openedPositionsSum,
      openedPositionsSumUsd: openedPositionsSum
    };
  }, [positions]);
};
