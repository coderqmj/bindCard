export {};
declare global {
  interface Window {
    Risk: {
      init: (publicKey: string) => any;
    };
    google: any;
    ApplePaySession: any;
    Pay: any;
  }
}
