import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers';
// import * as fromDualshock from '../reducers/dualshock.reducer';

const getDevicesState = createFeatureSelector<State>('devices');

const getNrfDeviceState = createSelector(
  getDevicesState,
  (devices) => devices.nrf
);

export const getNrfState = createSelector(
  getNrfDeviceState,
  (nrf) => nrf.state
);

export const getNrfTransmitting = createSelector(
  getNrfDeviceState,
  (nrf) => nrf.state.transmitting
);

/* export const getNrfTesting = createSelector(
  getNrfDeviceState,
  (nrf) => nrf.state.testing
); */
