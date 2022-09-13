import { FC, useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import { ConnectButton } from '@shared/components';
import { useAccountStore, useApi, useAuthStore } from '@shared/hooks';

import { AccountDataInfo } from './components/account-data-info/account-data-info';

export const Account: FC = observer(() => {
  const api = useApi();
  const accountStore = useAccountStore();
  const { data } = accountStore;
  const { address } = useAuthStore();

  useEffect(() => {
    (async () => {
      if (!address) {
        return;
      }
      await api.call(async () => {
        await accountStore.loadData(address);
      });
    })();
    // eslint-disable-next-line
  }, [address]);

  return (
    <div style={{ margin: 4, padding: 4, border: '1px solid blue' }}>
      {data ? <AccountDataInfo data={data} /> : <ConnectButton />}
    </div>
  );
});
