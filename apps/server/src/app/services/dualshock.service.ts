import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { Controller, initialControllerValue } from '../../models';

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
  triggers: { r2: 0, l2: 0 }
};

@WebSocketGateway(81, { transports: ['polling'] })
export class DualshockService {
  ds: any;
  controller: Controller = initialControllerValue;
  connected = false;

  constructor() {}

  @SubscribeMessage('[Dualshock] Get Connection')
  getConnection() {
    return this.connected;
  }

  @SubscribeMessage('[Dualshock] Add Listener')
  addListener() {}

  @SubscribeMessage('[Dualshock] Remove Listener')
  removeListener() {}

  connect() {

  }
}
