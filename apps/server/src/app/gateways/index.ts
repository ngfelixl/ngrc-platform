import { DualshockService } from './dualshock.service';
import { Provider } from '@nestjs/common';
import { Nrf24l01Service } from './nrf24l01.service';
import { SystemReportService } from './system-report.service';

export const gateways: Provider<any>[] = [
  DualshockService,
  Nrf24l01Service,
  SystemReportService
];
