import { Action } from '@ngrx/store';

export const NAVIGATE_UP = '[Navigation] Up';
export const NAVIGATE_DOWN = '[Navigation] Down';
export const NAVIGATE_SELECT = '[Navigation] Select';

export class NavigateUp implements Action {
  readonly type = NAVIGATE_UP;
}

export class NavigateDown implements Action {
  readonly type = NAVIGATE_DOWN;
}

export class NavigateSelect implements Action {
  readonly type = NAVIGATE_SELECT;
}

export type NavigationAction = NavigateUp | NavigateDown | NavigateSelect;
