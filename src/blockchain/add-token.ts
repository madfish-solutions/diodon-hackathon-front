import { providers } from 'ethers';

import { DDAI_TOKEN } from '@config/constants';

export const addToken = async (ethereum: providers.ExternalProvider) => {
  if (!ethereum.request) {
    throw new Error('Failed to switch to Klaytn network: provider does not support requests');
  }

  return await ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      // @ts-ignore
      type: 'ERC20', // Initially only supports ERC20, but eventually more!
      options: {
        ...DDAI_TOKEN
      }
    }
  });
};
