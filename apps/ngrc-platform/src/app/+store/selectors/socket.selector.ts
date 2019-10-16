import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { SocketState } from '../reducers/socket.reducer';

// export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('router');

const getSocketState = createFeatureSelector<SocketState>('socket');

export const getSocketConnected = createSelector(
  getSocketState,
  (state) => state.connected
);


export const getSocketListeners = createSelector(
  getSocketState,
  socket => socket.listeners
);

