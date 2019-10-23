import { createAction, props } from '@ngrx/store';
import { DualshockState } from '@ngrc/dualshock-shared';

export const dualshockConnect = createAction(
  '[Devices] Dualshock Connect'
);

export const dualshockDisconnect = createAction(
  '[Devices] Dualshock Disconnect'
);

export const dualshockStateChanged = createAction(
  '[Dualshock] state Changed',
  props<{ dualshockState: DualshockState }>()
);

export const dualshockError = createAction(
  '[Devices] Dualshock Error',
  props<{ error: string }>()
);
