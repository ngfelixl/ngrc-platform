import { NavigationState } from '../reducers/navigation.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getNavigationState = createFeatureSelector<NavigationState>('navigation');

export const getSidenavItemSelected = createSelector(
  getNavigationState,
  (state) => state.sidenavItemSelected
);
