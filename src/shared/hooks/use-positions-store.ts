import { useRootStore } from '@providers/root-store.provider';

export const usePositionsStore = () => {
  const { positionsStore } = useRootStore();

  return positionsStore;
};
