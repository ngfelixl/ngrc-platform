import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { Dualshock } from '@ngrc/dualshock';
import { pluck, distinctUntilChanged, tap } from 'rxjs/operators';

const eventCount = {
  buttons: {
    dpadup: 0,
    dpaddown: 0,
    dpadleft: 0,
    dpadright: 0,
    x: 0,
    circle: 0,
    triangle: 0,
    square: 0,
    r1: 0,
    l1: 0
  },
  sticks: { left: 0, right: 0 },
  triggers: { r2: 0, l2: 0 },
  gyro: { x: 0, y: 0, z: 0 },
  acceleration: { x: 0, y: 0, z: 0}
};

@WebSocketGateway(81, { transports: ['polling'] })
export class DualshockService {
  dualshock: Dualshock;

  constructor() {
    this.dualshock = new Dualshock();
  }

  @SubscribeMessage('[Dualshock] Get Connection')
  getConnection() {
    return this.dualshock.state$.pipe(
      pluck('connected'),
      distinctUntilChanged(),
      tap(console.log)
    );
  }

  @SubscribeMessage('[Dualshock] Add Listener')
  addListener() {}

  @SubscribeMessage('[Dualshock] Remove Listener')
  removeListener() {}

  connect() {

  }
}
