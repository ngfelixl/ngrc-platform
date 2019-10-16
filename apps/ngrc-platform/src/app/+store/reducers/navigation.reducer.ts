import { createReducer, on, Action } from '@ngrx/store';
import { navigateUp, navigateDown } from '../actions';


export interface NavigationState {
  sidenavItemSelected: number;
}

const initialState: NavigationState = {
  sidenavItemSelected: 0
};

const navigationReducer = createReducer(
  initialState,
  on(navigateUp, (state) => ({...state, sidenavItemSelected: Math.max(state.sidenavItemSelected - 1, 0)})),
  on(navigateDown, (state) => ({...state, sidenavItemSelected: Math.min(state.sidenavItemSelected + 1, 3)}))
);

export function reducer(state: NavigationState = initialState, action: Action): NavigationState {
  return navigationReducer(state, action);
}

