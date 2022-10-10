import { UseWalletProvider } from '@keshan3262/use-wallet';
import { BrowserRouter } from 'react-router-dom';

import { AppSync } from '@components/app-sync';
import { WALLET_CONNECTORS } from '@config/constants';
import { Layout } from '@layout';
import { RootStoreProvider } from '@providers/root-store.provider';
import { Modals, Onboarding } from '@shared/components';

import { AppRouter } from './app.router';

import 'intro.js/introjs.css';
import './App.css';

export const App = () => (
  <RootStoreProvider>
    <UseWalletProvider connectors={WALLET_CONNECTORS}>
      <BrowserRouter>
        <Layout>
          <AppRouter />
        </Layout>
        <AppSync />
        <Modals />
        <Onboarding />
      </BrowserRouter>
    </UseWalletProvider>
  </RootStoreProvider>
);
