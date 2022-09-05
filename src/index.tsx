import React from 'react';

import { UseWalletProvider } from '@keshan3262/use-wallet';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import 'reflect-metadata';

import './index.css';
import { App } from './app';
import { WALLET_CONNECTORS } from './config';
import { RootStoreProvider } from './providers';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RootStoreProvider>
      <UseWalletProvider connectors={WALLET_CONNECTORS}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UseWalletProvider>
    </RootStoreProvider>
  </React.StrictMode>
);
