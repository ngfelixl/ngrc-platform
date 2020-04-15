import { Action, createReducer, on } from '@ngrx/store';
import { SystemReport } from '@ngrc/interfaces/raspberrypi';
import { systemReportChanged } from '../actions';

export interface RaspberryPiState {
  systemReport: SystemReport;
}

const initialState: RaspberryPiState = {
  systemReport: null
};

const raspberrypiReducer = createReducer(
  initialState,
  on(systemReportChanged, (state, { systemReport }) => ({...state, systemReport}))
);

export function reducer(state: RaspberryPiState, action: Action): RaspberryPiState {
  return raspberrypiReducer(state, action);
}
