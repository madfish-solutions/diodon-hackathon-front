import { useRootStore } from '@providers/root-store.provider';

export const useModalsStore = () => {
  const { modalsStore } = useRootStore();

  return modalsStore;
};
