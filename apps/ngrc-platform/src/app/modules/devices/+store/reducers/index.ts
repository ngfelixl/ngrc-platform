import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromDualshock from './dualshock.reducer';
import * as fromNrf from './nrf.reducer';

export interface State {
  dualshock: fromDualshock.State;
  nrf: fromNrf.State;
}

export const reducers: ActionReducerMap<State> = {
  dualshock: fromDualshock.reducer,
  nrf: fromNrf.reducer
};

