import { useEffect } from 'react';

import { useAccountStore, useApi, useAuthStore, useModalsStore } from '@shared/hooks';
import { ModalType } from '@shared/store/modals.store';
import { isExist } from '@shared/types';

export const useDataCardViewModel = () => {
  const modalsStore = useModalsStore();
  const { address } = useAuthStore();
  const accountStore = useAccountStore();
  const api = useApi();

  const openDepositModal = () => modalsStore.open(ModalType.Deposit);
  const openWithdrawModal = () => modalsStore.open(ModalType.Withdraw);
  const isConnected = isExist(address);

  useEffect(() => {
    (async () => {
      if (!address) {
        return;
      }
      await api.call(async () => {
        await accountStore.loadData(address);
      });
    })();
  }, [address, api, accountStore]);

  return {
    isConnected,
    openDepositModal,
    openWithdrawModal
  };
};
