import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';

import 'reflect-metadata';

import './index.css';
import { App } from './app';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

Modal.setAppElement('#root');
