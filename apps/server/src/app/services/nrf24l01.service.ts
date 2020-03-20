// import { Injectable } from '@nestjs/common';
import { MappingService } from './mapping.service';
import { Nrf24State } from '@ngrc/nrf24';
import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { NrfWebsocket } from '@ngrc/dualshock-shared';
import { interval, Subject } from 'rxjs';
import { map, tap, sampleTime, takeUntil, mapTo, scan } from 'rxjs/operators';
import { DualshockService } from './dualshock.service';
import * as nrf24 from 'nrf24';

// @Injectable()
@WebSocketGateway(81, { transports: ['polling'] })
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
  transmitting$ = new Subject<boolean>();
  stopEmission$ = new Subject();

  constructor(
    private mappingService: MappingService,
    private dualshockService: DualshockService
  ) {
    this.connect();
  }

  connect() {
    try {
      this.radio = new nrf24.nRF24(this.cePin, this.spiDev);

      this.radio.begin(true);

      this.state = {
        ...this.state,
        connected: this.radio.present(),
        isP: this.radio.isP()
      }

      this.radio.config({
        PALevel: nrf24[this.state.PALevel],
        DataRate: nrf24[this.state.DataRate],
        Channel: this.state.Channel,
        CRCLength: nrf24[this.state.CRCLength],
        Irq: this.irqPin,
        PayloadSize: 5,
        retriesCount: 0
      });
    } catch (e) {
      console.log('Radio error', e);
    }
  }

  @SubscribeMessage(NrfWebsocket.getConfig)
  getConfig() {
    return this.state;
  }

  @SubscribeMessage(NrfWebsocket.setConfig)
  wsSetConfig(config: any) {
    this.setConfig(config);
  }

  @SubscribeMessage(NrfWebsocket.startTransmission)
  wsStartTransmission() {
    this.startTransmission();
  }

  @SubscribeMessage(NrfWebsocket.stopTransmission)
  wsStopTransmission() {
    try {
      this.radio.powerDown();
    } catch(e) {
      console.log(`Couldn't power down Nrf`, e);
    }
    this.stopEmission$.next();
  }

  @SubscribeMessage(NrfWebsocket.getDebugInformation)
  wsGetDebugInfo() {
    return this.radio.printDetails();
  }

  @SubscribeMessage(NrfWebsocket.readStats)
  wsGetStats() {
    const stats$ = interval(100).pipe(
      takeUntil(this.stopEmission$),
      mapTo(this.radio.getStats()),
      scan((acc, cur) => {
        return {
          TotalTx_Ok: acc.TotalTx_Ok - cur.TotalTx_Ok,
          TotalTx_Err: acc.TotalTx_Err - cur.TotalTx_Err,
          TotalRx: acc.TotalRx - cur.TotalRx,
          PipesRx: acc.PipesRx.map((pipe, index) => pipe - cur.PipesRx[index])
        };
      }, {
        TotalRx: 0,
        TotalTx_Err: 0,
        TotalTx_Ok: 0,
        PipesRx: [0, 0, 0, 0, 0]
      })
    );

    return stats$;
  }

  setConfig(config) {
    const setConfig = {...config};
    if (setConfig.PALevel) { setConfig.PALevel = nrf24[setConfig.PALevel]; }
    if (setConfig.DataRate) { setConfig.DataRate = nrf24[setConfig.DataRate]; }
    if (setConfig.CRCLength) { setConfig.CRCLength = nrf24[setConfig.CRCLength]; }
    this.radio.config(setConfig);
    this.state = {
      ...this.state,
      ...config
    }
    return this.state;
  }

  startTransmission() {
    this.radio.useWritePipe(this.txPipe);
    this.radio.addReadPipe(this.rxPipe);
    this.radio.powerUp();
    let state = new Uint8Array(5).fill(0);
    if (!this.state.transmitting) {

      return this.dualshockService.dualshock.state$.pipe(
        sampleTime(1000 / this.frequency),
        map((dsState) => this.mappingService.map(state, dsState.controller)),
        tap((state: Uint8Array) => this.radio.write(state, success => true)),
        takeUntil(this.dualshockService.stopEmission$)
      );
    }
  }
}
