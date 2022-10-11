import { useCallback, useEffect, useMemo, useState } from 'react';

import { MarketData } from '@api/markets';
import { getMarketPricesApi, IChartData } from '@api/positions';
import { valueChangeToPercentage } from '@shared/helpers/bignumber';
import { useAuthStore, useModalsStore, usePositionsStore } from '@shared/hooks';
import { ModalType } from '@shared/store/modals.store';

export const useMarketItemViewModel = (market: MarketData) => {
  const { marketId, marketPriceChangePercentage, indexPriceUsd, indexPriceChange24Usd } = market;

  const modalsStore = useModalsStore();
  const { isConnected } = useAuthStore();
  const [chartData, setChartData] = useState<Array<IChartData>>([]);

  useEffect(() => {
    getMarketPricesApi(marketId).then(setChartData);
  }, [marketId]);

  const positionsStore = usePositionsStore();
  const position = isConnected ? positionsStore.getPosition(marketId) : null;

  const indexPriceChangePercentage = useMemo(
    () => valueChangeToPercentage(indexPriceUsd, indexPriceChange24Usd).toNumber(),
    [indexPriceChange24Usd, indexPriceUsd]
  );

  const openHandler = () => {
    modalsStore.open(ModalType.OpenPosition, { marketId });
  };

  const openManageModal = useCallback(async () => {
    modalsStore.open(ModalType.ManagePosition, { marketId });
  }, [modalsStore, marketId]);

  return {
    chartData,
    position,
    isConnected,
    openHandler,
    openManageModal,
    marketPriceChangePercentage,
    indexPriceChangePercentage
  };
};
