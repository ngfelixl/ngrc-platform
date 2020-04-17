import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers';

const getDevicesState = createFeatureSelector<State>('devices');

export const getDualshockState = createSelector(
  getDevicesState,
  (state: State) => state.dualshock
);

export const getDualshockConnection = createSelector(
  getDualshockState,
  (state) => state.connected
);

export const getDualshockBattery = createSelector(
  getDualshockState,
  (state) => state.battery
);

export const getDualshockData = createSelector(
  getDualshockState,
  (state) => state.controller
);

export const getDualshockConfig = createSelector(
  getDualshockState,
  (state) => state.config
);
