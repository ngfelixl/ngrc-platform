import { dualshockError, dualshockStateChanged } from '../actions';
import { createReducer, on, Action } from '@ngrx/store';
import { DualshockState, initialControllerState } from '@ngrc/dualshock-shared';

export const dualshockReducer = createReducer(
  initialControllerState,
  on(dualshockStateChanged, (_, { dualshockState }) => dualshockState.connected ? dualshockState : initialControllerState),
  on(dualshockError, (state, { error }) => ({...state, error})),
);

export function reducer(state: DualshockState, action: Action) {
  return dualshockReducer(state, action);
}
