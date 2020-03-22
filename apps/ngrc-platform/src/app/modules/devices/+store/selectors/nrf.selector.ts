import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers';

const getDevicesState = createFeatureSelector<State>('devices');

export const getNrfDeviceState = createSelector(
  getDevicesState,
  (devices) => devices.nrf
);

export const getNrfState = createSelector(
  getNrfDeviceState,
  state => state.nrfState
);

export const getNrfTransmitting = createSelector(
  getNrfState,
  (nrf) => nrf.transmitting
);

export const getNrfConnected = createSelector(
  getNrfState,
  (state) => state.connected
);

export const getNrfStats = createSelector(
  getNrfDeviceState,
  state => state.nrfStats
);

export const getNrfTesting = createSelector(
  getNrfDeviceState,
  (state) => state.testing
);

export const getNrfBuffer = createSelector(
  getNrfDeviceState,
  state => state.buffer
);
