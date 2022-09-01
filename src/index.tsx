import React from 'react';

import { createRoot } from 'react-dom/client';
import { UseWalletProvider } from 'use-wallet';

import 'reflect-metadata';

import './index.css';
import { App } from './App';
import { RootStoreProvider } from './providers';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RootStoreProvider>
      <UseWalletProvider>
        <App />
      </UseWalletProvider>
    </RootStoreProvider>
  </React.StrictMode>
);
