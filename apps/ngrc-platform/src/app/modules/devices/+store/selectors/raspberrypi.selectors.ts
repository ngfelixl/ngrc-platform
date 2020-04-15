import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers';

const getDevicesState = createFeatureSelector<State>('devices');

const getRaspberrypiState = createSelector(
  getDevicesState,
  (state: State) => state.raspberrypi
);

export const getSystemReport = createSelector(
  getRaspberrypiState,
  (state) => state.systemReport
);

export const getMemoryUsage = createSelector(
  getSystemReport,
  (report) => report?.usedMemoryInPercent
);

export const getTemperature = createSelector(
  getSystemReport,
  (report) => report?.temperature
);
