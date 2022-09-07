import { useRootStore } from '@providers/root-store.provider';

import { type HomePageStore } from '../home-page.store';

export const useHomePageStore = () => {
  const { homePageStore } = useRootStore();

  return homePageStore as HomePageStore;
};
