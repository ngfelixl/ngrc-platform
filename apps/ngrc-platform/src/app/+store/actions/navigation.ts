import { Action, createAction } from '@ngrx/store';

export const navigateUp = createAction(
  '[Navigation] Up'
);

export const navigateDown = createAction(
  '[Navigation] Down'
);

export const navigationSelect = createAction(
  '[Navigation] Select'
);
