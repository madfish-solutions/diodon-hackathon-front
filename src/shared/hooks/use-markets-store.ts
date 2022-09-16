import { useRootStore } from '@providers/root-store.provider';

export const useMarketsStore = () => {
  const { marketsStore } = useRootStore();

  return marketsStore;
};
