import { DualshockState } from '../models';

export const initialControllerState: DualshockState = {
  connected: false,
  battery: 0,
  controller: {
    sticks: {
      leftx: 128,
      lefty: 128,
      rightx: 128,
      righty: 128
    },
    buttons: {
      x: false,
      square: false,
      triangle: false,
      circle: false,
      dpadup: false,
      dpadright: false,
      dpaddown: false,
      dpadleft: false,
      r1: false,
      l1: false,
      options: false,
      share: false
    },
    triggers: {
      r2: 0,
      l2: 0
    },
    gyro: {
      x: 0,
      y: 0,
      z: 0
    },
    acceleration: {
      x: 0,
      y: 0,
      z: 0
    }
  }
};
