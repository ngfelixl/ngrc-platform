import { SocketActionTypes, SocketActionsUnion } from '../actions/socket';

interface Listeners {
  [key: string]: {
    count: number;
    data: any;
  };
}

export interface State {
  connected: boolean;
  listeners: Listeners;
}

const initialState: State = {
  connected: false,
  listeners: {}
};

export function reducer(state: State = initialState, action: SocketActionsUnion): State {
  switch (action.type) {
    case SocketActionTypes.SocketConnected:
      return { ...state, connected: true };

    case SocketActionTypes.SocketDisconnected:
      return { ...state, connected: false };

    case SocketActionTypes.AddListener:
      if (state.listeners[action.payload]) {
        const count = state.listeners[action.payload].count + 1;
        state.listeners[action.payload] = {count: count, data: null};
      } else {
        state.listeners[action.payload] = {count: 1, data: null};
      }
      return {...state, listeners: state.listeners };

    case SocketActionTypes.OnData:
      state.listeners[action.listener].data = action.data;
      return {...state, listeners: state.listeners};

    case SocketActionTypes.RemoveListener:
      if (state.listeners[action.payload] && state.listeners[action.payload].count > 1) {
        state.listeners[action.payload].count--;
      } else if (state.listeners[action.payload] && state.listeners[action.payload].count === 1) {
        delete state.listeners[action.payload];
      }
      return {...state, listeners: state.listeners};

    default: return state;
  }
}

export const getConnected = (state: State) => state.connected;
