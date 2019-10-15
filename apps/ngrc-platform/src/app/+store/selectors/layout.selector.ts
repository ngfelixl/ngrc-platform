import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../reducers';

// export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('router');

// const getLayoutState = createFeatureSelector<fromRoot.State>('layout');


export const getMappingSelectDialog = createSelector(
  fromRoot.getLayoutState,
  layout => layout.showMappingSelect
);

export const isLandscape = createSelector(
  fromRoot.getLayoutState,
  layout => layout.isLandscape
);
