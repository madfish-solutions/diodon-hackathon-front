import { providers } from 'ethers';

import { CHAIN_ID_AS_HEX } from '@config/constants';
import { BLOCK_EXPLORER_URL, CHAIN_NAME, RPC_URL } from '@config/environment';
import { isErrorWithCode } from '@shared/errors';

const NO_CHAIN_KNOWN_ERROR_CODE = 4902;

export const switchChain = async (ethereum: providers.ExternalProvider) => {
  if (!ethereum.request) {
    throw new Error('Failed to switch to Klaytn network: provider does not support requests');
  }

  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: CHAIN_ID_AS_HEX }]
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    const error = e as Error;
    let errorMessageToShow = `Failed to switch to Klaytn network: ${error.message}`;
    if (isErrorWithCode(error) && error.code === NO_CHAIN_KNOWN_ERROR_CODE) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: CHAIN_ID_AS_HEX,
              chainName: CHAIN_NAME,
              nativeCurrency: {
                name: 'KLAY',
                symbol: 'KLAY',
                decimals: 18
              },
              rpcUrls: [RPC_URL],
              blockExplorerUrls: [BLOCK_EXPLORER_URL]
            }
          ]
        });

        return;
      } catch (addChainError) {
        // eslint-disable-next-line no-console
        console.error(addChainError);
        errorMessageToShow = `Failed to add Klaytn network: ${(addChainError as Error).message}`;
      }
    }

    throw new Error(errorMessageToShow);
  }
};
