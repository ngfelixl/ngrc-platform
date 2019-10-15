import { DualshockActions, DualshockActionTypes } from '../actions';
import { Controller, controllerInitialValue } from '../../models/controller';

interface Listeners {
  [key: string]: {
    count: number;
    data: any;
  };
}

export interface State {
  online: boolean;
  data: {
    battery: number;
    charging: boolean;
  };
  controller: Controller;
  listeners: Listeners;
  error: any;
}

const initialState = {
  online: false,
  data: {
    battery: 0,
    charging: false
  },
  controller: controllerInitialValue,
  listeners: {},
  error: null
};

export function reducer(state: State = initialState, action: DualshockActions): State {
  switch (action.type) {
    case DualshockActionTypes.Changed:
      return state = state;

    case DualshockActionTypes.Online:
      return state = {...state, online: true };

    case DualshockActionTypes.Offline:
      return state = {...state, online: false };

    case DualshockActionTypes.SetConnection:
        return state = {...state, online: action.payload };

    case DualshockActionTypes.DsBatteryChanged:
      return state = {...state, data: { ...state.data, battery: action.payload.battery }};

    case DualshockActionTypes.DsError:
      return state = {...state, error: action.payload.error };

    case DualshockActionTypes.AddListener:
      let data;
      if (state.listeners[action.key]) {
        data = {count: state.listeners[action.key].count ++, data: state.listeners[action.key].data};
      } else {
        data = {count: 1, data: null};
      }
      return {...state, listeners: {...state.listeners, [action.key]: data}};

    case DualshockActionTypes.OnData:
      // console.log('New Data', action.key, action.data);
      return {...state, controller: {...state.controller, [action.key]: action.data }};

    default: return state;
  }
}
