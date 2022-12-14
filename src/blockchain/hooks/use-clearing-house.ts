import { useCallback, useMemo } from 'react';

import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber/lib/bignumber';
import { BigNumber } from 'bignumber.js';

import { FALLBACK_PROVIDER, ZERO_AMOUNT } from '@config/constants';
import { AMMS, CLEARING_HOUSE_ADDRESS, DDAI_ADDRESS } from '@config/environment';
import { useAuthStore } from '@shared/hooks';
import { MarketId } from '@shared/types';

import { ERC20TokenContractWrapper } from '../erc20-contract-wrapper';
import { ClearingHouse } from '../facades';
import { Side } from '../facades/types';

export const useClearingHouse = () => {
  const authStore = useAuthStore();

  const clearingHouse = useMemo(
    () =>
      authStore && authStore.connection
        ? new ClearingHouse(authStore.connection.provider, CLEARING_HOUSE_ADDRESS, authStore.connection.signer)
        : null,
    [authStore]
  );

  const dDaiTransactionContract = useMemo(
    () =>
      authStore && authStore.connection
        ? new ERC20TokenContractWrapper(DDAI_ADDRESS, authStore.connection.signer)
        : null,
    [authStore]
  );

  const dDaiViewContract = useMemo(
    () => new ERC20TokenContractWrapper(DDAI_ADDRESS, authStore.connection?.provider ?? FALLBACK_PROVIDER),
    [authStore]
  );

  const getAllowance = useCallback(
    async () =>
      authStore.address && dDaiViewContract
        ? await dDaiViewContract.methods.allowance(authStore.address, CLEARING_HOUSE_ADDRESS)
        : null,
    [authStore, dDaiViewContract]
  );

  const getApproves = useCallback(
    async (rawAmount: EthersBigNumber) => {
      if (!dDaiTransactionContract) {
        return;
      }

      const allowance = await getAllowance();
      if (!allowance) {
        return;
      }

      if (EthersBigNumber.from(allowance).gt(ZERO_AMOUNT) && rawAmount.gt(allowance)) {
        const response = await dDaiTransactionContract.methods.approve(
          CLEARING_HOUSE_ADDRESS,
          EthersBigNumber.from(ZERO_AMOUNT)
        );
        await response.wait();
      }

      if (rawAmount.gt(allowance)) {
        const response = await dDaiTransactionContract.methods.approve(CLEARING_HOUSE_ADDRESS, rawAmount);
        await response.wait();
      }
    },
    [dDaiTransactionContract, getAllowance]
  );

  const openPosition = useCallback(
    async (
      market: MarketId,
      side: Side,
      quoteAssetAmount: BigNumber,
      leverage: BigNumber,
      baseAssetAmountLimit: BigNumber // Min received
    ) => {
      return clearingHouse
        ? clearingHouse.openPosition(AMMS[market], side, quoteAssetAmount, leverage, baseAssetAmountLimit)
        : null;
    },
    [clearingHouse]
  );

  return {
    clearingHouse,
    dDaiTransactionContract,
    dDaiViewContract,
    getAllowance,
    getApproves,
    openPosition
  };
};
