import { useCallback, useEffect, useMemo, useState } from 'react';

import { MarketData } from '@api/markets';
import { getMarketPricesApi, IChartData } from '@api/positions';
import { valueChangeToPercentage } from '@shared/helpers/bignumber';
import { useAuthStore, useModalsStore, usePositionsStore } from '@shared/hooks';
import { ModalType } from '@shared/store/modals.store';
import { PositionType } from '@shared/types';

export const useMarketItemViewModel = (market: MarketData) => {
  const { marketId, marketPriceChangePercentage, indexPriceUsd, marketPriceUsd, indexPriceChange24Usd } = market;

  const modalsStore = useModalsStore();
  const { isConnected, address, connection } = useAuthStore();
  const api = useApi();
  const { clearingHouse, getApproves } = useClearingHouse();
  const [positionBeingClosed, setPositionBeingClosed] = useState(false);
  const [chartData, setChartData] = useState<{
    volumeData: Array<IChartData>;
    spotPriceData: Array<IChartData>;
  }>({ volumeData: [], spotPriceData: [] });

  useEffect(() => {
    getMarketPricesApi(marketId).then(setChartData);
  }, [marketId]);

  const positionsStore = usePositionsStore();
  const position = isConnected ? positionsStore.getPosition(marketId) : null;

  const indexPriceChangePercentage = useMemo(
    () => valueChangeToPercentage(indexPriceUsd, indexPriceChange24Usd).toNumber(),
    [indexPriceChange24Usd, indexPriceUsd]
  );

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
