import { useCallback, useEffect, useMemo, useState } from 'react';

import BigNumber from 'bignumber.js';

import { MarketData } from '@api/markets';
import { getMarketPricesApi, IChartData } from '@api/positions';
import { useClearingHouse } from '@blockchain/hooks/use-clearing-house';
import { ZERO_AMOUNT } from '@config/constants';
import { AMMS } from '@config/environment';
import { valueChangeToPercentage } from '@shared/helpers/bignumber';
import { useApi, useAuthStore, useModalsStore, usePositionsStore } from '@shared/hooks';
import { ModalType } from '@shared/store/modals.store';

export const useMarketItemViewModel = (market: MarketData) => {
  const { marketId, marketPriceUsd, marketPriceChange24Usd, indexPriceChange24Usd, indexPriceUsd } = market;

  const modalsStore = useModalsStore();
  const { isConnected, address } = useAuthStore();
  const api = useApi();
  const { clearingHouse } = useClearingHouse();
  const [positionBeingClosed, setPositionBeingClosed] = useState(false);
  const [chartData, setChartData] = useState<Array<IChartData>>([]);

  useEffect(() => {
    getMarketPricesApi(marketId).then(setChartData);
  }, [marketId]);

  const positionsStore = usePositionsStore();
  const position = isConnected ? positionsStore.getPosition(marketId) : null;

  const marketPriceChangePercentage = useMemo(
    () => valueChangeToPercentage(marketPriceUsd, marketPriceChange24Usd).toNumber(),
    [marketPriceChange24Usd, marketPriceUsd]
  );

  const indexPriceChangePercentage = useMemo(
    () => valueChangeToPercentage(indexPriceUsd, indexPriceChange24Usd).toNumber(),
    [indexPriceChange24Usd, indexPriceUsd]
  );

  const openHandler = () => {
    modalsStore.open(ModalType.OpenPosition, { marketId });
  };

  const closeHandler = useCallback(async () => {
    try {
      setPositionBeingClosed(true);
      await api.call(async () => {
        if (!clearingHouse || !marketId) {
          return;
        }

        await clearingHouse.closePosition(AMMS[marketId], new BigNumber(ZERO_AMOUNT));
        modalsStore.close();
        await positionsStore.loadPositions(address!);
      });
    } finally {
      setPositionBeingClosed(false);
    }
  }, [api, clearingHouse, marketId, modalsStore, address, positionsStore]);

  return {
    chartData,
    position,
    positionBeingClosed,
    isConnected,
    openHandler,
    closeHandler,
    marketPriceChangePercentage,
    indexPriceChangePercentage
  };
};
