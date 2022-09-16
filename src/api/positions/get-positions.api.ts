import { POSITIONS_API_URL } from '@config/api';

import { AccountPositionResponse } from './positions.interface';

export const getPositionsApi = async (accountPkh: string): Promise<AccountPositionResponse> => {
  const response = await fetch(POSITIONS_API_URL, {
    headers: new Headers({
      AccountPKH: accountPkh
    })
  });

  return response.json();
};
