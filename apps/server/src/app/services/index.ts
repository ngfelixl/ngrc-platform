import { DualshockService } from './dualshock.service';
import { Provider } from '@nestjs/common';
import { Nrf24l01Service } from './nrf24l01.service';
import { MappingService } from './mapping.service';

export const services: Provider<any>[] = [
  DualshockService,
  MappingService,
  Nrf24l01Service
];
