import { createSelector, createFeatureSelector } from '@ngrx/store';
import { LayoutState } from '../reducers/layout.reducer';

export const getLayoutState = createFeatureSelector<LayoutState>('layout');

export const getMappingSelectDialog = createSelector(
  getLayoutState,
  layout => layout.showMappingSelect
);

export const isLandscape = createSelector(
  getLayoutState,
  layout => layout.isLandscape
);

export const getShowSidenav = createSelector(
  getLayoutState,
  (state) => state.showSidenav
);
