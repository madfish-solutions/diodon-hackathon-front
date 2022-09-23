import { FC, useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import { ERC20TokenContractWrapper } from '@blockchain/erc20-contract-wrapper';
import { useConnectEthereum } from '@blockchain/use-connect-ethereum';
import { waitForNextBlock } from '@blockchain/wait-for-next-block';
import { DDAI_ADDRESS } from '@config/environment';
import { useApi, useAuthStore, useAccountStore } from '@shared/hooks';

export const AppSync: FC = observer(() => {
  const api = useApi();
  const { connect } = useConnectEthereum();
  const accountStore = useAccountStore();
  const { address, connection } = useAuthStore();

  useEffect(() => {
    (async () => {
      await api.call(async () => {
        await connect();
      });
    })();
    // eslint-disable-next-line
  }, []);

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

  return <div />;
});
