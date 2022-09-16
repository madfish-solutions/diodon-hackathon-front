import { FC, useEffect } from 'react';

import { useConnectEthereum } from '@blockchain/use-connect-ethereum';
import { useApi } from '@shared/hooks';

export const AppSync: FC = () => {
  const api = useApi();
  const { connect } = useConnectEthereum();

  useEffect(() => {
    (async () => {
      await api.call(async () => {
        await connect();
      });
    })();
    // eslint-disable-next-line
  }, []);

  return null;
};
