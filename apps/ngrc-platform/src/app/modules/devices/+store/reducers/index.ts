import { ActionReducerMap } from '@ngrx/store';
import { DualshockState, reducer as dualshock} from './dualshock.reducer';
import { NrfState, reducer as nrf } from './nrf.reducer';
import { RaspberryPiState, reducer as raspberrypi } from './raspberrypi.reducer';

export interface State {
  dualshock: DualshockState;
  nrf: NrfState;
  raspberrypi: RaspberryPiState;
}

export const reducers: ActionReducerMap<State> = {
  dualshock,
  nrf,
  raspberrypi
};

