import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers';
import * as fromDualshock from '../reducers/dualshock.reducer';

const getDevicesState = createFeatureSelector<State>('devices');
const getDsState = createSelector(
  getDevicesState,
  (devices) => devices.dualshock
);

export const getDualshock = createSelector(
  getDevicesState,
  (state: State) => state.dualshock
);

export const getDsListeners = createSelector(
  getDsState,
  (state: fromDualshock.State) => state.listeners
);

export const getDsData = createSelector(
  getDualshock, (state) => state.controller
);

export const getDsLeft = createSelector(
  getDualshock, (state) => state.controller.left
);
