import { useCallback, useEffect } from 'react';

import BigNumber from 'bignumber.js';

import { useAccountStore } from './use-account-store';
import { useApi } from './use-api';
import { useAuthStore } from './use-auth-store';

export const useDDAIBalance = () => {
  const api = useApi();
  const { address } = useAuthStore();
  const accountStore = useAccountStore();
  const { dDAIBalance } = accountStore;

  const updateDDAIBalance = useCallback(() => {
    if (address) {
      api.call(async () => accountStore.loadDDAIBalance(address));
    }
  }, [accountStore, address, api]);

  useEffect(() => updateDDAIBalance(), [updateDDAIBalance]);

  return {
    balance: dDAIBalance.decimalPlaces(2, BigNumber.ROUND_DOWN).toNumber(),
    updateDDAIBalance
  };
};
