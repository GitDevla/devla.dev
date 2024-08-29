export function poorMansCron(
  firstTimeInSeconds: number,
  resetTimeInSeconds: number,
  callback: Function,
): void {
  const now = new Date();
  const firstTimeout: number = firstTimeInSeconds - now.getTime();

  setTimeout((): void => {
    callback();

    setInterval(callback, resetTimeInSeconds);
  }, firstTimeout);
}
