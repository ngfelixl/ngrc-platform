import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { Dualshock } from '@ngrc/dualshock';
import { DsWebsocket } from '@ngrc/dualshock-shared';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@WebSocketGateway(81, { transports: ['polling'] })
export class DualshockService {
  dualshock: Dualshock;
  stopEmission$ = new Subject();

  constructor() {
    this.dualshock = new Dualshock();
  }

  /* @SubscribeMessage('[Dualshock] Get Connection')
  getConnection() {
    return this.dualshock.state$.pipe(
      pluck('connected'),
      distinctUntilChanged(),
      map((connected) => ({event: '[Dualshock] Connection Changed', data: connected}))
    );
  } */

  @SubscribeMessage(DsWebsocket.connect)
  listen() {
    return this.dualshock.state$.pipe(
      map((state) => ({event: DsWebsocket.stateChange, data: state})),
      takeUntil(this.stopEmission$),
    );
  }

  @SubscribeMessage(DsWebsocket.disconnect)
  unlisten() {
    this.stopEmission$.next();
  }
}
