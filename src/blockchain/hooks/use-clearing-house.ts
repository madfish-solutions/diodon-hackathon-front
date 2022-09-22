import { useCallback, useMemo } from 'react';

import { TransactionResponse } from '@ethersproject/abstract-provider';
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber/lib/bignumber';

import { ZERO_AMOUNT } from '@config/constants';
import { CLEARING_HOUSE_ADDRESS, DDAI_ADDRESS } from '@config/environment';
import { useAuthStore } from '@shared/hooks';

import { ERC20TokenContractWrapper } from '../erc20-contract-wrapper';
import { ClearingHouse } from '../facades';

export const useClearingHouse = () => {
  const authStore = useAuthStore();

  const clearingHouse = useMemo(
    () => new ClearingHouse(authStore.connection!.provider, CLEARING_HOUSE_ADDRESS, authStore.connection!.signer),
    [authStore.connection]
  );

  const dDaiTransactionContract = useMemo(
    () => new ERC20TokenContractWrapper(DDAI_ADDRESS, authStore.connection!.signer),
    [authStore.connection]
  );

  const dDaiViewContract = useMemo(
    () => new ERC20TokenContractWrapper(DDAI_ADDRESS, authStore.connection!.provider),
    [authStore.connection]
  );

  const getAllowance = useCallback(
    async () => await dDaiViewContract.methods.allowance(authStore.address!, CLEARING_HOUSE_ADDRESS),
    [authStore.address, dDaiViewContract.methods]
  );

  const getApproves = useCallback(
    async (rawAmount: EthersBigNumber) => {
      const transactionsFunctions: Array<() => Promise<TransactionResponse>> = [];
      const allowance = await getAllowance();

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
    [dDaiTransactionContract.methods, getAllowance]
  );

  return {
    clearingHouse,
    dDaiTransactionContract,
    dDaiViewContract,
    getAllowance,
    getApproves
  };
};
