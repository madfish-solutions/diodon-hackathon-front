import { Web3Provider } from '@ethersproject/providers';

export const waitForNextBlock = async (provider: Web3Provider) => {
  return new Promise<number>(resolve => provider.once('block', blockNumber => resolve(blockNumber)));
};
