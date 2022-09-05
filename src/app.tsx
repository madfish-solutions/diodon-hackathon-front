import { observer } from 'mobx-react-lite';

import { Layout } from '@layout';
import { HomePage } from '@modules/home';

import './App.css';

// eslint-disable-next-line sonarjs/cognitive-complexity
export const App = observer(() => (
  <Layout>
    <HomePage />
  </Layout>
));
