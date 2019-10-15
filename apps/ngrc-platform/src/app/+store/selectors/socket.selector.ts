import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as fromSocket from '../reducers/socket.reducer';

// export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('router');

const getSocketState = createFeatureSelector<fromSocket.State>('socket');

export const getSocketListeners = createSelector(
  getSocketState,
  socket => socket.listeners
);
