import { useEffect } from 'react';

import { ERC20TokenContractWrapper } from '@blockchain/erc20-contract-wrapper';
import { waitForNextBlock } from '@blockchain/wait-for-next-block';
import { DDAI_ADDRESS } from '@config/environment';
import { useAccountStore, useApi, useAuthStore, useModalsStore } from '@shared/hooks';
import { ModalType } from '@shared/store/modals.store';
import { isExist } from '@shared/types';

export const useDataCardViewModel = () => {
  const modalsStore = useModalsStore();
  const { address, connection } = useAuthStore();
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

      await api.call(async () => Promise.all([accountStore.loadData(address), accountStore.loadDDAIBalance(address)]));
    })();

    if (!connection || !address) {
      return;
    }

    const dDaiContract = new ERC20TokenContractWrapper(DDAI_ADDRESS, connection.provider);
    const transferEventFilters = [
      dDaiContract.filters.Transfer(address, null, null),
      dDaiContract.filters.Transfer(null, address, null)
    ];
    const transferCallback = () =>
      void api.call(async () => {
        await waitForNextBlock(connection.provider);
        await accountStore.loadDDAIBalance(address);
      });

    transferEventFilters.forEach(filter => connection.provider.on(filter, transferCallback));

    return () => transferEventFilters.forEach(filter => connection.provider.off(filter, transferCallback));
  }, [address, accountStore, api, connection]);

  return {
    isConnected,
    openDepositModal,
    openWithdrawModal
  };
};
