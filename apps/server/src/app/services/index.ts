import { DualshockService } from './dualshock.service';
import { Provider } from '@nestjs/common';
import { Nrf24l01Service } from './nrf24l01.service';

export const services: Provider<any>[] = [
  DualshockService,
  Nrf24l01Service
];
