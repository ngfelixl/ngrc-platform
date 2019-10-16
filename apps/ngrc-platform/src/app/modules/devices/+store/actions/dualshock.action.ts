import { createAction, props } from '@ngrx/store';

export enum DualshockActionTypes {
  DsError = '[Devices] Dualshock Error',
  DsDataUpdate = '[Devices] Dualshock Data Update',

  AddListener = '[Devices] Dualshock Add Listener',
  RemoveListener = '[Devices] Dualshock Remove Listener',
  OnData = '[Devices] Dualshock On Data'
}

export const dualshockChanged = createAction(
  '[Devices] Dualshock Changed'
);

export const dualshockOnline = createAction(
  '[Devices] Dualshock Online'
);

export const dualshockOffline = createAction(
  '[Devices] Dualshock Offline'
);

export const setDualshockConnection = createAction(
  '[Devices] Dualshock Set Connection',
  props<{ isConnected: boolean; }>()
);

export const setDualshockBattery = createAction(
  '[Devices] Dualshock Set Battery',
  props<{ battery: number }>()
);

export const dualshockError = createAction(
  '[Devices] Dualshock Error',
  props<{ error: string }>()
);

export const dualshockAddListener = createAction(
  '[Devices] Dualshock Add Listener',
  props<{ button: string }>()
);

export const dualshockAddManyListeners = createAction(
  '[Devices] Dualshock Add Many Listener',
  props<{ buttons: string[] }>()
);

export const dualshockAddAllListeners = createAction(
  '[Devices] Dualshock Add All Listeners'
);

export const dualshockRemoveListener = createAction(
  '[Devices] Dualshock Remove Listener',
  props<{ button: string }>()
);

export const dualshockRemoveManyListeners = createAction(
  '[Devices] Dualshock Remove Many Listeners',
  props<{ buttons: string[] }>()
);

export const dualshockRemoveAllListeners = createAction(
  '[Devices] Dualshock Remove All Listeners'
);

export const setDualshockCharging = createAction(
  '[Devices] Dualshock Charging',
  props<{ isCharging: boolean; }>()
);

export const dualshockData = createAction(
  '[Devices] Dualshock Data',
  props<{ button: string, value: number }>()
);
