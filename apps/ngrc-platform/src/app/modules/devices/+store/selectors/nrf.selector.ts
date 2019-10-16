import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers';
// import * as fromDualshock from '../reducers/dualshock.reducer';

const getDevicesState = createFeatureSelector<State>('devices');

export const getNrfState = createSelector(
  getDevicesState,
  (devices) => devices.nrf
);

export const getNrfTransmitting = createSelector(
  getNrfState,
  (nrf) => nrf.transmitting
);
