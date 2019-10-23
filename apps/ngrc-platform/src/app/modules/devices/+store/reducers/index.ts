import { ActionReducerMap } from '@ngrx/store';

import { DualshockState } from '@ngrc/dualshock-shared';
import * as fromDualshock from './dualshock.reducer';
import * as fromNrf from './nrf.reducer';

export interface State {
  dualshock: DualshockState;
  nrf: fromNrf.NrfState;
}

export const reducers: ActionReducerMap<State> = {
  dualshock: fromDualshock.reducer,
  nrf: fromNrf.reducer
};

