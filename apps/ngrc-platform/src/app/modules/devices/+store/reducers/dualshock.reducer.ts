import { dualshockError, dualshockStateChanged } from '../actions';
import { createReducer, on, Action } from '@ngrx/store';
import { DualshockState, initialControllerState } from '@ngrc/dualshock-shared';


const initialState: DualshockState = {
  connected: false,
  battery: 0,
  controller: {
    sticks: {
      left: {
        x: 128,
        y: 128
      },
      right: {
        x: 128,
        y: 128
      }
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

export const dualshockReducer = createReducer(
  initialControllerState,
  on(dualshockStateChanged, (_, { dualshockState }) => dualshockState),
  on(dualshockError, (state, { error }) => ({...state, error})),
);

export function reducer(state: DualshockState, action: Action) {
  return dualshockReducer(state, action);
}
