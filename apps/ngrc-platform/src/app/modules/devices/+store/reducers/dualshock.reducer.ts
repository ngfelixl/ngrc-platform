import { dualshockError, dualshockStateChanged, dualshockValuesChanged } from '../actions';
import { createReducer, on, Action } from '@ngrx/store';
import { initialControllerState, Controller } from '@ngrc/interfaces/dualshock';

export interface DualshockState {
  battery: number;
  connected: boolean;
  controller: Controller;
  error: any;
}

const initialState: DualshockState = {
  battery: null,
  connected: false,
  controller: initialControllerState,
  error: null
}

export const dualshockReducer = createReducer(
  initialState,
  on(dualshockStateChanged, (state, { dualshockState }) => ({...state, ...dualshockState})),
  on(dualshockValuesChanged, (state, { controller }) => (({...state, controller }))),
  on(dualshockError, (state, { error }) => ({...state, connected: false, controller: initialControllerState, error})),
);

export function reducer(state: DualshockState, action: Action) {
  return dualshockReducer(state, action);
}
