import { DsAttributes } from './ds-attributes';
import { NrfAttributes } from './nrf-attributes';

export interface Device {
  online: boolean;
  error?: string;
  data?: any;
}
