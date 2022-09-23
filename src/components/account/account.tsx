import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { ConnectButton } from '@shared/components';
import { useAccountStore } from '@shared/hooks';

import styles from './account.module.scss';
import { AccountDataInfo } from './components/account-data-info';

export const Account: FC = observer(() => {
  const accountStore = useAccountStore();
  const { data } = accountStore;

  return (
    <div>
      <h2 className={styles.title}>Account data</h2>
      {data ? <AccountDataInfo data={data} /> : <ConnectButton />}
    </div>
  );
});
