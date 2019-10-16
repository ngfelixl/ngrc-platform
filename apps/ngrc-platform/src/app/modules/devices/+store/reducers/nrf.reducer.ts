import { getNrfConfigSuccess, setNrfConfigSuccess, startNrfTestSuccess,
  stopNrfTestSuccess, nrfStartTransmissionSuccess, nrfStopTransmissionSuccess } from '../actions';
import { createReducer, on, Action } from '@ngrx/store';

export interface NrfState {
  connected: boolean;
  isP: boolean;
  Channel: number;
  PALevel: string;
  DataRate: string;
  CRCLength: string;
  transmitting: boolean;
}


const initialState = {
  connected: false,
  isP: null,
  Channel: null,
  DataRate: null,
  CRCLength: null,
  PALevel: null,
  transmitting: null
};

const nrfReducer = createReducer(
  initialState,
  on(
    getNrfConfigSuccess,
    setNrfConfigSuccess,
    startNrfTestSuccess,
    stopNrfTestSuccess,
    nrfStartTransmissionSuccess,
    nrfStopTransmissionSuccess,
    (state, { nrfState }) => ({...state, ...nrfState}))
);

export function reducer(state: NrfState, action: Action): NrfState {
  return nrfReducer(state, action);
}
