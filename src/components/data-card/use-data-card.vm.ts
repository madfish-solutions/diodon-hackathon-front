import { useAuthStore, useModalsStore } from '@shared/hooks';
import { ModalType } from '@shared/store/modals.store';
import { isExist } from '@shared/types';

export const useDataCardViewModel = () => {
  const modalsStore = useModalsStore();
  const { address } = useAuthStore();

  const openDepositModal = () => modalsStore.open(ModalType.Deposit);
  const openWithdrawModal = () => modalsStore.open(ModalType.Withdraw);
  const isConnected = isExist(address);

  return {
    isConnected,
    openDepositModal,
    openWithdrawModal
  };
};
