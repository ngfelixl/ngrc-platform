import { ActionReducerMap } from '@ngrx/store';
import { DualshockState, reducer as dualshock} from './dualshock.reducer';
import { NrfState, reducer as nrf } from './nrf.reducer';

export interface State {
  dualshock: DualshockState;
  nrf: NrfState;
}

export const reducers: ActionReducerMap<State> = {
  dualshock,
  nrf
};

