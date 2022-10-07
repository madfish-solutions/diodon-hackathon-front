import { useCallback, useEffect, useMemo, useState } from 'react';

import BigNumber from 'bignumber.js';
import { BigNumber as EthersBigNumber } from 'ethers';

import { MarketData } from '@api/markets';
import { getMarketPricesApi, IChartData } from '@api/positions';
import { Amm } from '@blockchain/facades/amm';
import { useClearingHouse } from '@blockchain/hooks/use-clearing-house';
import { DDAI_DECIMALS, ZERO_AMOUNT } from '@config/constants';
import { AMMS } from '@config/environment';
import { toAtomic, valueChangeToPercentage } from '@shared/helpers/bignumber';
import { useApi, useAuthStore, useModalsStore, usePositionsStore } from '@shared/hooks';
import { ModalType } from '@shared/store/modals.store';

export const useMarketItemViewModel = (market: MarketData) => {
  const { marketId, marketPriceChangePercentage, indexPriceUsd, indexPriceChange24Usd } = market;

  const modalsStore = useModalsStore();
  const { isConnected, address, connection } = useAuthStore();
  const api = useApi();
  const { clearingHouse, getApproves } = useClearingHouse();
  const [positionBeingClosed, setPositionBeingClosed] = useState(false);
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

  const amm = useMemo(() => {
    if (market && connection) {
      return new Amm(connection.provider, AMMS[market.marketId], connection.signer);
    }

    return null;
  }, [market, connection]);

  const getFee = useCallback(
    async (notional: BigNumber) => {
      if (!amm) {
        return {
          tollFee: new BigNumber(ZERO_AMOUNT),
          spreadFee: new BigNumber(ZERO_AMOUNT)
        };
      }

      return await amm.calcFee(notional);
    },
    [amm]
  );

  const closeHandler = useCallback(async () => {
    try {
      setPositionBeingClosed(true);
      await api.call(async () => {
        if (!clearingHouse || !marketId) {
          return;
        }

        const { tollFee, spreadFee } = await getFee(toAtomic(new BigNumber(position!.amountUsd), DDAI_DECIMALS));
        await getApproves(EthersBigNumber.from(tollFee.plus(spreadFee).toFixed()));
        await clearingHouse.closePosition(AMMS[marketId], new BigNumber(ZERO_AMOUNT));
        modalsStore.close();
        await positionsStore.loadPositions(address!);
      });
    } finally {
      setPositionBeingClosed(false);
    }
  }, [api, clearingHouse, marketId, modalsStore, address, positionsStore, getApproves, getFee, position]);

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
