import { Action, createReducer, on } from '@ngrx/store';
import { SystemReport } from '@ngrc/interfaces/system-report';

export interface RaspberryPiState {
  systemReport: SystemReport;
}

const initialState: RaspberryPiState = {
  systemReport: null
};

const raspberrypiReducer = createReducer(
  initialState,
);

export function reducer(state: RaspberryPiState, action: Action): RaspberryPiState {
  return raspberrypiReducer(state, action);
}
