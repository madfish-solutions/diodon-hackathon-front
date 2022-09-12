import { Layout } from '@layout';

import './App.css';
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
