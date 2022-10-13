import { Provider } from '@ethersproject/providers';

export const waitForNextBlock = async (provider: Provider) => {
  return new Promise<number>(resolve => provider.once('block', blockNumber => resolve(blockNumber)));
};
