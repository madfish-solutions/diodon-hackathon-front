import { useRootStore } from '@providers/root-store.provider';

export const useAccountStore = () => {
  const { accountStore } = useRootStore();

  return accountStore;
};
