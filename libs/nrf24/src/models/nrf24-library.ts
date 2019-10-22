export interface Nrf24Library {
  new();
  on(key: string, callback: (result: any) => void): void;
}
