import { SubscribeMessage, WebSocketGateway, MessageBody } from '@nestjs/websockets';
import { Dualshock } from './dualshock';
import { DsWebsocket } from '@ngrc/interfaces/websockets';
import { Subject, BehaviorSubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { DualshockConfig } from '@ngrc/interfaces/dualshock';

@WebSocketGateway(environment.port, { transports: ['polling'] })
export class DualshockService {
  dualshock: Dualshock;
  unlisten$ = new Subject();
  config$ = new BehaviorSubject<DualshockConfig>({
    frequency: 24
  });

  constructor() {
    this.dualshock = new Dualshock();
  }

  @SubscribeMessage(DsWebsocket.setConfig)
  setConfig(@MessageBody() config: DualshockConfig) {
    this.config$.next(config);
  }

  @SubscribeMessage(DsWebsocket.getConfig)
  getConfig() {
    return this.config$.getValue();
  }

  @SubscribeMessage(DsWebsocket.connect)
  listen() {
    return this.dualshock.state$.pipe(
      map((state) => ({event: DsWebsocket.stateChange, data: state})),
    );
  }

  @SubscribeMessage(DsWebsocket.listen)
  listenToData() {
    return this.dualshock.data$.pipe(
      map(controller => ({ event: DsWebsocket.valueChange, data: { ...controller }})),
      takeUntil(this.unlisten$)
    );
  }

  @SubscribeMessage(DsWebsocket.unlisten)
  unlisten() {
    this.unlisten$.next();
  }
}
