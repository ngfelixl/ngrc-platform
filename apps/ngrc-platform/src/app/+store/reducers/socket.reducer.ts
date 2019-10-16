import { createReducer, on, Action } from '@ngrx/store';
import { socketConnected, socketDisconnected, addSocketListener, removeSocketListener, newSocketData } from '../actions';

interface Listeners {
  [key: string]: {
    count: number;
    data: any;
  };
}

export interface SocketState {
  connected: boolean;
  listeners: Listeners;
}

const initialState: SocketState = {
  connected: false,
  listeners: {}
};

const socketReducer = createReducer(
  initialState,
  on(socketConnected, (state) => ({...state, connected: true})),
  on(socketDisconnected, (state) => ({...state, connected: false})),
  on(addSocketListener, (state, { key }) => {
    const listener = state.listeners[key];
    if (listener) {
      return {...state, listeners: {...state.listeners, [key]: {count: listener.count + 1, data: null}}};
    } else {
      return {...state, listeners: {...state.listeners, [key]: {count: 1, data: null}}};
    }
  }),
  on(removeSocketListener, (state, { key }) => {
    const listener = state.listeners[key];
    if (listener && listener.count > 1) {
      return {...state, listeners: {...state.listeners, [key]: {...listener, count: listener.count - 1}}};
    } else if (listener && listener.count === 1) {
      const listeners = {...state.listeners};
      delete listeners[key];
      return {...state, listeners};
    }
    return state;
  }),
  on(newSocketData, (state, {listener, data}) => ({
    ...state,
    listeners: {
      ...state.listeners,
      [listener]: {...state.listeners[listener], data}
    }
  }))
);

export function reducer(state: SocketState = initialState, action: Action): SocketState {
  return socketReducer(state, action);
}

