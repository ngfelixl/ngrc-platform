import { DualshockActionTypes, dualshockOnline,
  dualshockOffline, setDualshockConnection, setDualshockBattery,
  dualshockAddListener, dualshockRemoveListener, dualshockError, dualshockData, dualshockRemoveAllListeners } from '../actions';
import { Controller, controllerInitialValue } from '../../models/controller';
import { createReducer, on, Action } from '@ngrx/store';

interface Listeners {
  [key: string]: {
    count: number;
    data: any;
  };
}

export interface DualshockState {
  online: boolean;
  battery: number;
  charging: boolean;
  controller: Controller;
  listeners: Listeners;
  error: any;
}

const initialState = {
  online: false,
  battery: 0,
  charging: false,
  controller: controllerInitialValue,
  listeners: {},
  error: null
};

export const dualshockReducer = createReducer(
  initialState,
  on(dualshockOnline, (state) => ({...state, online: true})),
  on(dualshockOffline, (state) => ({...state, online: false})),
  on(setDualshockConnection, (state, { isConnected }) => ({...state, online: isConnected})),
  on(setDualshockBattery, (state, { battery }) => ({...state, battery})),
  on(dualshockAddListener, addListenerReducer),
  // on(dualshockRemoveListener, (state, { key }) => ),
  on(dualshockError, (state, { error }) => ({...state, error})),
  on(dualshockData, (state, { button, value }) => ({...state, controller: {...state.controller, [button]: value}}))
);

export function reducer(state: DualshockState, action: Action) {
  return dualshockReducer(state, action);
}

function addListenerReducer(state: DualshockState, payload: { button: string }): DualshockState {
  let data: {count: number; data: any};
  const button = payload.button;
  const listener = state.listeners[button];

  if (listener) {
    data = { count: listener.count + 1, data: listener.data };
  } else {
    data = { count: 1, data: null };
  }

  return {...state, listeners: {...state.listeners, [button]: data }};
}

