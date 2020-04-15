import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { SystemReport } from '@ngrc/interfaces/raspberrypi';
import { spawn } from 'child_process';
import { freemem, totalmem } from 'os';
import { interval, Observable, Observer, zip, Subject } from 'rxjs';
import { map, switchMap, takeUntil, startWith } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { RaspberrypiWebsocket } from '@ngrc/interfaces/websockets';

@WebSocketGateway(environment.port, { transports: ['polling'] })
export class SystemReportService {
  systemReport$: Observable<SystemReport>;
  unlisten$ = new Subject();

  constructor() {
    const temperatureChildProcess$ = new Observable<number>((observer: Observer<number>) => {
      const temp = spawn('cat', ['/sys/class/thermal/thermal_zone0/temp']);
      temp.stdout.on('data', (data: Buffer) => {
        observer.next(+data.toString() / 1000);
        observer.complete();
      });
      temp.stderr.on('error', (errorMessage: string) => {
        observer.error(errorMessage);
      });
    });

    const temparture$ = interval(2000).pipe(
      startWith(0),
      switchMap(() => temperatureChildProcess$)
    );

    const memoryInPercent$ = interval(2000).pipe(
      startWith(0),
      map(() => 1 - freemem() / totalmem())
    );

    this.systemReport$ = zip(
      temparture$,
      memoryInPercent$
    ).pipe(
      map(([temperature, usedMemoryInPercent]) => ({ temperature, usedMemoryInPercent }))
    );
  }

  @SubscribeMessage(RaspberrypiWebsocket.readSystemReport)
  listen() {
    return this.systemReport$.pipe(
      map((report) => ({event: RaspberrypiWebsocket.systemReport, data: report})),
      takeUntil(this.unlisten$)
    );
  }

  @SubscribeMessage(RaspberrypiWebsocket.unreadSystemReport)
  unlisten() {
    this.unlisten$.next();
  }
}