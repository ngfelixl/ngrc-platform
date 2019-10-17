
import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as fromRouter from '@ngrx/router-store';
import { RouterStateUrl } from '../router.utils';

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('router');

export const getModelId = createSelector(
  getRouterState,
  router => router && router.state && +router.state.idParams.models
);
