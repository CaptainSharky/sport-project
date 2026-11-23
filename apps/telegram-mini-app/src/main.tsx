
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './app/App';
import { getTelegramAdapter } from './shared/telegram/telegramAdapter';

import './styles.css';

const telegram = getTelegramAdapter();

telegram.prepareScreen();

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
