import { DsAttributes } from './ds-attributes';
import { NrfAttributes } from './nrf-attributes';

export interface Device {
  connected: boolean;
  error?: string;
  data?: any;
}
