export interface TelegramWebApp {
  initData: string;
  ready(): void;
  expand(): void;
}

interface TelegramWindow extends Window {
  Telegram?: {
    WebApp?: TelegramWebApp;
  };
}

export function createTelegramAdapter(
  webApp?: TelegramWebApp
) {
  return {
    prepareScreen(): void {
      if (webApp) {
        webApp.ready();
        webApp.expand();
      }
    },

    hasLaunchData(): boolean {
      return Boolean(webApp?.initData);
    },
  };
}

export function getTelegramAdapter() {
  const telegramWindow = window as TelegramWindow;

  return createTelegramAdapter(
    telegramWindow.Telegram?.WebApp
  );
}
