const status = document.getElementById('status');
const telegram = window.Telegram?.WebApp;

if (telegram) {
  telegram.ready();
  telegram.expand();
}

status.textContent = telegram?.initData
  ? 'Данные запуска Telegram получены. Это тестовый экран.'
  : 'Для проверки запуска откройте приложение из чата с ботом в Telegram.';

document.getElementById('check').addEventListener('click', () => {
  document.getElementById('confirmation').textContent = 'Кнопка работает.';
});
