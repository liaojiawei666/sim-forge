export function req<R = any>(channel: string, args?: any): Promise<R> {
  return window.electron.api(channel, args);
}