import { useEffect } from 'react';

import { useConnectEthereum } from '@blockchain/use-connect-ethereum';

export const useAppViewModel = () => {
  const { connect } = useConnectEthereum();

  useEffect(() => {
    (async () => {
      await connect();
    })();
    // eslint-disable-next-line
  }, []);
};
