import { NrfActionTypes, NrfActions } from '../actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { NrfState } from '../../models/nrf-state';

export interface State {
  state: NrfState;
  // transmittedValues: Array<{timestamp: Date, data: Uint8Array}>;
}

const initialState = {
  state: {
    connected: false,
    isP: null,
    Channel: null,
    DataRate: null,
    CRCLength: null,
    PALevel: null,
    transmitting: null,
  }
};

export function reducer(state: State = initialState, action: NrfActions): State {
  switch (action.type) {
    case NrfActionTypes.GetConfigSuccess:
    case NrfActionTypes.SetConfigSuccess:
    case NrfActionTypes.StartTestSuccess:
    case NrfActionTypes.StopTestSuccess:
    case NrfActionTypes.StartTransmissionSuccess:
    case NrfActionTypes.StopTransmissionSuccess:
      return {...state, state: action.config};

    default: return state;
  }
}
