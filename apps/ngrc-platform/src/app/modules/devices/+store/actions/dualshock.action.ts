import { createAction, props } from '@ngrx/store';
import { DualshockState, Controller } from '@ngrc/interfaces/dualshock';

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

export const dualshockValuesChanged = createAction(
  '[Dualshock] Values Changed',
  props<{ controller: Controller }>()
)

export const dualshockError = createAction(
  '[Devices] Dualshock Error',
  props<{ error: string }>()
);

export const listenToDualshock = createAction(
  '[Devices] Dualshock Listen'
);

export const unlistenToDualshock = createAction(
  '[Devices] Dualshock Unlisten'
);
