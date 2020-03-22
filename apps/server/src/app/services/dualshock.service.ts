import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Dualshock } from '@ngrc/dualshock';
import { DsWebsocket } from '@ngrc/interfaces/websockets';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@WebSocketGateway(81, { transports: ['polling'] })
export class DualshockService {
  dualshock: Dualshock;
  unlisten$ = new Subject();

  constructor() {
    this.dualshock = new Dualshock();
  }

  @SubscribeMessage(DsWebsocket.connect)
  listen() {
    return this.dualshock.state$.pipe(
      map((state) => ({event: DsWebsocket.stateChange, data: state})),
    );
  }

  @SubscribeMessage(DsWebsocket.unlisten)
  unlisten() {
    this.unlisten$.next();
  }

  @SubscribeMessage(DsWebsocket.listen)
  listenToData() {
    return this.dualshock.data$.pipe(
      map(controller => ({ event: DsWebsocket.valueChange, data: { ...controller }})),
      takeUntil(this.unlisten$)
    );
  }
}
