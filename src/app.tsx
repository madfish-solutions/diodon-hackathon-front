import { observer } from 'mobx-react-lite';

import { Layout } from '@layout';

import './App.css';
import { AppRouter } from './app.router';

// eslint-disable-next-line sonarjs/cognitive-complexity
export const App = observer(() => (
  <Layout>
    <AppRouter />
  </Layout>
));
