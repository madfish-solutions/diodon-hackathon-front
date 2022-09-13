import { ACCOUNT_API_URL } from '@config/api';

import { AccountDataResponse } from './account.interface';

export const getAccountDataApi = async (accountPkh: string): Promise<AccountDataResponse> => {
  const response = await fetch(ACCOUNT_API_URL, {
    headers: new Headers({
      AccountPKH: accountPkh
    })
  });

  return response.json();
};
