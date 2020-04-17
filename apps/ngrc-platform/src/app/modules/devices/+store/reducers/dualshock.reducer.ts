import { dualshockError, dualshockStateChanged, dualshockValuesChanged, loadDualshockConfigSuccess, setDualshockConfigSuccess } from '../actions';
import { createReducer, on, Action } from '@ngrx/store';
import { initialControllerState, Controller, DualshockConfig } from '@ngrc/interfaces/dualshock';

export interface DualshockState {
  battery: number;
  connected: boolean;
  controller: Controller;
  config: DualshockConfig;
  error: any;
}

const initialState: DualshockState = {
  battery: null,
  connected: false,
  controller: initialControllerState,
  config: {
    frequency: null
  },
  error: null
}

export const dualshockReducer = createReducer(
  initialState,
  on(dualshockStateChanged, (state, { dualshockState }) => ({...state, ...dualshockState})),
  on(dualshockValuesChanged, (state, { controller }) => (({...state, controller }))),
  on(dualshockError, (state, { error }) => ({...state, connected: false, controller: initialControllerState, error})),
  on(loadDualshockConfigSuccess, (state, { config }) => ({...state, config: {...state.config, ...config}})),
  on(setDualshockConfigSuccess, (state, { config }) => ({...state, config: {...state.config, ...config}}))
);

export function reducer(state: DualshockState, action: Action) {
  return dualshockReducer(state, action);
}
