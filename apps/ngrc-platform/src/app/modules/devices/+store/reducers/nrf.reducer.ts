import { Nrf24State, Nrf24Stats } from '@ngrc/interfaces/nrf24';
import { Action, createReducer, on } from '@ngrx/store';
import { nrfStateChanged, nrfStatsChanged, nrfStartTest, nrfStopTest } from '../actions';

export interface NrfState {
  testing: boolean,
  nrfState: Nrf24State,
  buffer: number[],
  nrfStats: Nrf24Stats
}

const initialState: NrfState = {
  testing: false,
  nrfState: {
    connected: false,
    isP: null,
    Channel: null,
    DataRate: null,
    CRCLength: null,
    PALevel: null,
    transmitting: null
  },
  buffer: [0, 0, 0, 0, 0],
  nrfStats: {
    TotalTx_Ok: 0,
    TotalTx_Err: 0,
    TotalRx: 0,
    PipesRx: [0, 0, 0, 0, 0, 0]
  }
};

const nrfReducer = createReducer(
  initialState,
  on(nrfStateChanged, (state, { nrfState }) => ({...state, nrfState })),
  on(nrfStatsChanged, (state, { buffer, nrfStats }) => ({...state, buffer, nrfStats })),
  on(nrfStartTest, (state) => ({...state, testing: true})),
  on(nrfStopTest, (state) => ({...state, testing: false}))
);

export function reducer(state: NrfState, action: Action): NrfState {
  return nrfReducer(state, action);
}
