import { FC, useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import { ConnectButton } from '@shared/components';
import { useAccountStore, useApi, useAuthStore } from '@shared/hooks';

import styles from './account.module.scss';
import { AccountDataInfo } from './components/account-data-info';

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
    <div>
      <h2 className={styles.header}>Account data</h2>
      {data ? <AccountDataInfo data={data} /> : <ConnectButton />}
    </div>
  );
});
