import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SocketState } from '../reducers/socket.reducer';

const getSocketState = createFeatureSelector<SocketState>('socket');

export const getSocketConnected = createSelector(
  getSocketState,
  (state) => state.connected
);

export const getSocketListeners = createSelector(
  getSocketState,
  socket => socket.listeners
);

