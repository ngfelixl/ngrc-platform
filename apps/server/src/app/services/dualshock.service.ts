import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { Dualshock } from '@ngrc/dualshock';
import { pluck, distinctUntilChanged, tap, map } from 'rxjs/operators';
import { Body } from '@nestjs/common';
import { EMPTY } from 'rxjs';

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
    l1: 0,
    options: 0,
    share: 0
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
      map((connected) => ({event: '[Dualshock] Connection Changed', data: connected}))
    );
  }

  @SubscribeMessage('[Dualshock] Add Listener')
  addListener(client: any, button: string) {
    let group: string;
    if (Object.keys(eventCount.buttons).includes(button)) {
      group = 'buttons';
    } else if (Object.keys(eventCount.sticks).includes(button)) {
      group = 'sticks';
    } else if (Object.keys(eventCount.triggers).includes(button)) {
      group = 'triggers';
    }

    if (!group) {
      return;
    } else if (eventCount[group][button] > 0) {
      eventCount[group][button]++;
    } else {
      eventCount[group][button]++;
      return this.dualshock.state$.pipe(
        pluck('controller'),
        pluck(group),
        pluck(button),
        distinctUntilChanged(),
        map((data) => ({event: `[Dualshock] ${button}`, data}))
      );
    }
  }

  @SubscribeMessage('[Dualshock] Remove Listener')
  removeListener(client: any, button: string) {

  }
}
