declare global {
  interface Window {
    electron: {
      api: (channel: string, args?: any) => any;
    };
  }
}

export {};