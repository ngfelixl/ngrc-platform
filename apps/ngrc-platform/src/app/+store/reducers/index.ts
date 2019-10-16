import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import { RouterStateUrl } from '../router.utils';
import * as fromRouter from '@ngrx/router-store';
import { environment } from '../../../environments/environment';

import * as fromLayout from './layout.reducer';
import * as fromNavigation from './navigation.reducer';
import * as fromSocket from './socket.reducer';

export interface State {
  layout: fromLayout.LayoutState;
  navigation: fromNavigation.NavigationState;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  socket: fromSocket.SocketState;
}

export const reducers: ActionReducerMap<State> = {
  layout: fromLayout.reducer,
  navigation: fromNavigation.reducer,
  router: fromRouter.routerReducer,
  socket: fromSocket.reducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State, action: any): State => {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [] // [logger]
  : [];



