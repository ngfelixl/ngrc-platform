import { createAction, props } from '@ngrx/store';
import { DualshockState, Controller, DualshockConfig } from '@ngrc/interfaces/dualshock';

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

export const loadDualshockConfig = createAction(
  '[Devices] Dualshock Get Config'
);

export const loadDualshockConfigSuccess = createAction(
  '[Devices] Dualshock Get Config Success',
  props<{ config: DualshockConfig }>()
);

export const loadDualshockConfigFailed = createAction(
  '[Devices] Dualshock Get Config Failed',
  props<{ error: any }>()
);

export const setDualshockConfig = createAction(
  '[Devices] Dualshock Set Config',
  props<{ config: DualshockConfig }>()
);

export const setDualshockConfigSuccess = createAction(
  '[Devices] Dualshock Set Config Success',
  props<{ config: DualshockConfig }>()
);

export const setDualshockConfigFailed = createAction(
  '[Devices] Dualshock Set Config Failed',
  props<{ error: any }>()
);

