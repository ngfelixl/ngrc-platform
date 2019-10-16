import { Action, createReducer, on } from '@ngrx/store';
import { closeSidenav, openSidenav, toggleSidenav, openMappingSelect, closeMappingSelect, checkOrientation } from '../actions';

export interface LayoutState {
  showSidenav: boolean;
  showMappingSelect: boolean;
  isLandscape: boolean;
}

const initialState: LayoutState = {
  showSidenav: false,
  showMappingSelect: false,
  isLandscape: window.innerHeight < window.innerWidth
};

const layoutReducer = createReducer(
  initialState,
  on(closeSidenav, (state) => ({...state, showSidenav: false})),
  on(openSidenav, (state) => ({...state, showSidenav: true})),
  on(toggleSidenav, (state) => ({...state, showSidenav: !state.showSidenav})),
  on(openMappingSelect, (state) => ({...state, showMappingSelect: true})),
  on(closeMappingSelect, (state) => ({...state, showMappingSelect: false})),
  on(checkOrientation, (state) => ({...state, isLandscape: window.innerHeight > window.innerWidth}))
);

export function reducer(state: LayoutState = initialState, action: Action): LayoutState {
  return layoutReducer(state, action);
}

