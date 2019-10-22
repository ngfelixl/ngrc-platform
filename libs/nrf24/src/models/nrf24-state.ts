export interface Nrf24State {
  connected: boolean;
  isP: boolean;
  Channel: number;
  PALevel: string;
  DataRate: string;
  CRCLength: string;
  transmitting?: boolean;
}
