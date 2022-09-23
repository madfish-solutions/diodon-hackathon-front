import { useCallback, useMemo } from 'react';

import { TransactionResponse } from '@ethersproject/abstract-provider';
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber/lib/bignumber';
import { BigNumber } from 'bignumber.js';

import { ZERO_AMOUNT } from '@config/constants';
import { CLEARING_HOUSE_ADDRESS, DDAI_ADDRESS } from '@config/environment';
import { useAuthStore } from '@shared/hooks';

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
    () =>
      authStore && authStore.connection
        ? new ERC20TokenContractWrapper(DDAI_ADDRESS, authStore.connection.provider)
        : null,
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
      const transactionsFunctions: Array<() => Promise<TransactionResponse>> = [];
      if (!dDaiTransactionContract) {
        return transactionsFunctions;
      }

      const allowance = await getAllowance();
      if (!allowance) {
        return transactionsFunctions;
      }

      if (EthersBigNumber.from(allowance).gt(ZERO_AMOUNT) && rawAmount.gt(allowance)) {
        transactionsFunctions.push(async () =>
          dDaiTransactionContract.methods.approve(CLEARING_HOUSE_ADDRESS, EthersBigNumber.from(ZERO_AMOUNT))
        );
      }

      if (rawAmount.gt(allowance)) {
        transactionsFunctions.push(async () =>
          dDaiTransactionContract.methods.approve(CLEARING_HOUSE_ADDRESS, rawAmount)
        );
      }

      return transactionsFunctions;
    },
    [dDaiTransactionContract, getAllowance]
  );

  const openPosition = useCallback(
    async (side: Side, quoteAssetAmount: BigNumber, leverage: BigNumber, baseAssetAmountLimit: BigNumber) => {
      return clearingHouse
        ? clearingHouse.openPosition(CLEARING_HOUSE_ADDRESS, side, quoteAssetAmount, leverage, baseAssetAmountLimit)
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
