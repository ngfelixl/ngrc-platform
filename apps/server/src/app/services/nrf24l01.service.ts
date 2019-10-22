import { Injectable } from '@nestjs/common';
import { MappingsService } from '../mappings/mappings.service';
import { Nrf24State } from '@ngrc/nrf24';

@Injectable()
export class Nrf24l01Service {
  spiDev = 0; // spideva.b === a*10+b
  cePin = 22;
  irqPin = 25;
  rxPipe = '0xF0F0F0F0E1';
  txPipe = '0xF0F0F0F0D2';
  radio: any;
  transmitInterval: any;
  statsInterval: any;
  frequency: 20;
  state: Nrf24State = {
    connected: false,
    isP: null,
    Channel: 90,
    PALevel: 'RF24_PA_LOW',
    DataRate: 'RF24_1MBPS',
    CRCLength: 'RF24_CRC_16',
    transmitting: false
  };

  constructor(private mappingService: MappingsService) {}

}
