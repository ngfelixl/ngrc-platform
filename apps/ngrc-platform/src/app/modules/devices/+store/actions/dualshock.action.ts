import { createAction, props } from '@ngrx/store';
import { DualshockState } from '@ngrc/dualshock-shared';

export const dualshockListen = createAction(
  '[Devices] Dualshock Listen'
);

export const dualshockUnlisten = createAction(
  '[Devices] Dualshock Unlisten'
);

export const dualshockStateChanged = createAction(
  '[Dualshock] state Changed',
  props<{ dualshockState: DualshockState }>()
);

export const dualshockError = createAction(
  '[Devices] Dualshock Error',
  props<{ error: string }>()
);
