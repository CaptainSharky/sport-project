export function createTelegramAdapter(webApp) {
  return {
    prepareScreen() {
      if (webApp) {
        webApp.ready();
        webApp.expand();
      }
    },
    hasLaunchData() {
      return Boolean(webApp?.initData);
    },
  };
}
