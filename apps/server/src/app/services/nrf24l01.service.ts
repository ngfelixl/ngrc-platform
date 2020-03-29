// import { Injectable } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Nrf24State, Nrf24Stats } from '@ngrc/interfaces/nrf24';
import { NrfWebsocket } from '@ngrc/interfaces/websockets';
import * as nrf24 from 'nrf24';
import { BehaviorSubject, interval, NEVER, Subject } from 'rxjs';
import { distinctUntilChanged, map, mapTo, pluck, scan, shareReplay, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { Server } from 'socket.io';
import { environment } from '../../environments/environment';
import { DualshockService } from './dualshock.service';
import { MappingService } from './mapping.service';

@WebSocketGateway(environment.port, { transports: ['polling'] })
export class Nrf24l01Service implements OnGatewayInit {
  @WebSocketServer() server: Server;
  spiDev = 0; // spideva.b === a*10+b
  cePin = 22;
  irqPin = 25;
  rxPipe = '0xF0F0F0F0E1';
  txPipe = '0xF0F0F0F0D2';
  radio: any;
  frequency: 20;
  state$ = new BehaviorSubject<Nrf24State>({
    connected: false,
    isP: null,
    Channel: 90,
    PALevel: 'RF24_PA_LOW',
    DataRate: 'RF24_1MBPS',
    CRCLength: 'RF24_CRC_16',
    transmitting: false
  });
  isTransmitting$ = this.state$.pipe(
    pluck('transmitting'),
    distinctUntilChanged(),
    shareReplay(1)
  );
  stopTest$ = new Subject();
  stopTransmission$ = new Subject();

  constructor(
    private mappingService: MappingService,
    private dualshockService: DualshockService
  ) {
    this.connect();
    this.state$.subscribe((state) => {
      if (!this.radio) {
        return;
      }

      this.radio.config({
        PALevel: nrf24[state.PALevel],
        DataRate: nrf24[state.DataRate],
        Channel: state.Channel,
        CRCLength: nrf24[state.CRCLength],
        Irq: this.irqPin,
        PayloadSize: 5,
        retriesCount: 0
      });

      if (this.server) {
        this.server.emit(NrfWebsocket.state, state);
      }
    });

    const transmission$ = this.isTransmitting$.pipe(
      switchMap((isTransmitting) => {
        if (!this.radio) {
          return NEVER;
        }

        if (!isTransmitting) {
          this.radio.powerDown();
          return NEVER;
        }

        let bitArray = new Uint8Array(5).fill(0);
        this.radio.useWritePipe(this.txPipe);
        this.radio.addReadPipe(this.rxPipe);
        this.radio.powerUp();
        return interval(1000 / this.frequency).pipe(
          withLatestFrom(this.dualshockService.dualshock.data$),
          map(([_, controller]) => this.mappingService.map(bitArray, controller)),
          tap(console.log),
          tap((bitArray: Uint8Array) => this.radio.write(bitArray, success => true)),
        );
      })
    );

    const stats$ = this.isTransmitting$.pipe(
      tap(console.log),
      switchMap(isTransmitting => {
        if (!isTransmitting || !this.radio) {
          return NEVER;
        }

        return interval(1000).pipe(
          mapTo(this.radio.getStats()),
          tap(console.log),
          scan(this.statsAccumulator, {
            TotalRx: 0,
            TotalTx_Err: 0,
            TotalTx_Ok: 0,
            PipesRx: [0, 0, 0, 0, 0, 0]
          }),
          tap((stats) => this.server.emit(NrfWebsocket.stats, stats))
        );
      })
    );

    transmission$.subscribe();
    // stats$.subscribe();
  }

  afterInit(server: Server) {
    server.on('connection', () => {
      server.emit(NrfWebsocket.state, this.state$.getValue());
    });
  }

  connect() {
    try {
      this.radio = new nrf24.nRF24(this.cePin, this.spiDev);
      this.radio.begin(true);

      this.state$.next({
        ...this.state$.getValue(),
        connected: this.radio.present(),
        isP: this.radio.isP()
      });
    } catch (e) {
      console.log('Radio error', e);
    }
  }

  @SubscribeMessage(NrfWebsocket.setConfig)
  setConfig(config: Nrf24State) {
    const setConfig = {...config};
    if (setConfig.PALevel) { setConfig.PALevel = nrf24[setConfig.PALevel]; }
    if (setConfig.DataRate) { setConfig.DataRate = nrf24[setConfig.DataRate]; }
    if (setConfig.CRCLength) { setConfig.CRCLength = nrf24[setConfig.CRCLength]; }
    this.radio.config(setConfig);
    this.state$.next({
      ...this.state$.getValue(),
      ...config
    });
  }

  @SubscribeMessage(NrfWebsocket.startTransmission)
  startTransmission() {
    this.state$.next({
      ...this.state$.getValue(),
      transmitting: true
    });
    return this.state$.getValue();
  }

  @SubscribeMessage(NrfWebsocket.stopTransmission)
  stopTransmission() {
    this.state$.next({
      ...this.state$.getValue(),
      transmitting: false
    });
    return this.state$.getValue();
  }

  @SubscribeMessage(NrfWebsocket.getDebugInformation)
  wsGetDebugInfo() {
    return this.radio.printDetails();
  }

  @SubscribeMessage(NrfWebsocket.startTest)
  startTest() {
    this.radio.useWritePipe(this.txPipe);
    this.radio.addReadPipe(this.rxPipe);
    this.radio.powerUp();

    return interval(24).pipe(
      map(() => new Date().getTime() / 300),
      map(time => ([
        ((Math.sin(time + 0) + 1) * 90),
        ((Math.sin(time * 1.01 + 1) + 1) * 90),
        ((Math.sin(time * 0.04 + 2) + 1) * 90),
        ((Math.sin(time * 0.8 + 3) + 1) * 90),
        ((Math.sin(time * 0.95 + 4) + 1) * 90)
      ])),
      map((numberArray) => Uint8Array.from(numberArray)),
      tap((buffer) => {
        this.radio.write(buffer, success => true);
      }),
      map((buffer) => ({
        event: NrfWebsocket.stats,
        data: {
          buffer: Array.from(buffer),
          stats: this.radio.getStats()
        }
      })),
      takeUntil(this.stopTest$)
    );
  }

  @SubscribeMessage(NrfWebsocket.stopTest)
  stopTest() {
    this.stopTest$.next();
  }

  statsAccumulator(acc: Nrf24Stats, cur: Nrf24Stats): Nrf24Stats {
    return {
      TotalTx_Ok: acc.TotalTx_Ok - cur.TotalTx_Ok,
      TotalTx_Err: acc.TotalTx_Err - cur.TotalTx_Err,
      TotalRx: acc.TotalRx - cur.TotalRx,
      PipesRx: acc.PipesRx.map((pipe, index) => pipe - cur.PipesRx[index])
    };
  }
}
