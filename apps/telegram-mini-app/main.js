import { createTelegramAdapter } from './telegram-adapter.js';

const status = document.getElementById('status');
const telegram = createTelegramAdapter(window.Telegram?.WebApp);
telegram.prepareScreen();

status.textContent = telegram.hasLaunchData()
  ? 'Данные запуска Telegram получены. Это тестовый экран.'
  : 'Для проверки запуска откройте приложение из чата с ботом в Telegram.';

document.getElementById('check').addEventListener('click', () => {
  document.getElementById('confirmation').textContent = 'Кнопка работает.';
});
