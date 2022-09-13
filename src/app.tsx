import { Layout } from '@layout';

import './app.css';
import { AppRouter } from './app.router';
import { useAppViewModel } from './use-app.vm';

export const App = () => {
  useAppViewModel();

  return (
    <Layout>
      <AppRouter />
    </Layout>
  );
};
