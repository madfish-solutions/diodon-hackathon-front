import { useCallback, useEffect, useState } from 'react';

import { MarketData } from '@api/markets';
import { getMarketPricesApi, IChartData } from '@api/positions';
import { useAuthStore, useModalsStore, usePositionsStore } from '@shared/hooks';
import { ModalType } from '@shared/store/modals.store';
import { PositionType } from '@shared/types';

export const useMarketItemViewModel = (market: MarketData) => {
  const { marketId, marketPriceChangePercentage, indexPriceUsd, marketPriceUsd, indexPriceChangePercentage } = market;

  const modalsStore = useModalsStore();
  const { isConnected } = useAuthStore();
  const [chartData, setChartData] = useState<{
    volumeData: Array<IChartData>;
    spotPriceData: Array<IChartData>;
  }>({ volumeData: [], spotPriceData: [] });

  useEffect(() => {
    getMarketPricesApi(marketId).then(setChartData);
  }, [marketId]);

  const positionsStore = usePositionsStore();
  const position = isConnected ? positionsStore.getPosition(marketId) : null;

  const openPositionHandler = () => {
    const recommendedPositionType = indexPriceUsd > Number(marketPriceUsd) ? PositionType.LONG : PositionType.SHORT;
    modalsStore.open(ModalType.OpenPosition, { marketId, recommendedPositionType });
  };

  const openManageModal = useCallback(async () => {
    modalsStore.open(ModalType.ManagePosition, { marketId });
  }, [modalsStore, marketId]);

  return {
    chartData,
    position,
    isConnected,
    openManageModal,
    openPositionHandler,
    marketPriceChangePercentage,
    indexPriceChangePercentage
  };
};
