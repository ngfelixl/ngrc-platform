import { Action } from '@ngrx/store';

export enum DualshockActionTypes {
  Changed = '[Devices] DualshockChanged',
  Online = '[Devices] Dualshock Online',
  Offline = '[Devices] Dualshock Offline',
  SetConnection = '[Devices] Dualshock Set Connection',
  DsBatteryChanged = '[Devices] Dualshock battery changed',
  DsError = '[Devices] Dualshock Error',
  DsDataUpdate = '[Devices] Dualshock Data Update',

  AddListener = '[Devices] Dualshock Add Listener',
  RemoveListener = '[Devices] Dualshock Remove Listener',
  OnData = '[Devices] Dualshock On Data'
}

export class DualshockChanged implements Action {
  readonly type = DualshockActionTypes.Changed;
}

export class DualshockSetConnection implements Action {
  readonly type = DualshockActionTypes.SetConnection;
  constructor(public payload: boolean) {}
}

export class DsBatteryChanged implements Action {
  readonly type = DualshockActionTypes.DsBatteryChanged;

  constructor(public payload: { battery: number }) {}
}

export class DualshockOnline implements Action {
  readonly type = DualshockActionTypes.Online;
}

export class DualshockOffline implements Action {
  readonly type = DualshockActionTypes.Offline;
}

export class DualshockDataUpdate implements Action {
  readonly type = DualshockActionTypes.DsDataUpdate;
  constructor(public payload: { type: string, value: any }) {}
}

export class DsError implements Action {
  readonly type = DualshockActionTypes.DsError;

  constructor(public payload: { error: string }) {}
}

export class DsAddListener implements Action {
  readonly type = DualshockActionTypes.AddListener;
  constructor(public key: string) {}
}
export class DsRemoveListener implements Action {
  readonly type = DualshockActionTypes.RemoveListener;
  constructor(public key: string) {}
}
export class DsOnData implements Action {
  readonly type = DualshockActionTypes.OnData;
  constructor(public key: string, public data: any) {}
}

export type DualshockActions =
  DualshockChanged
  | DualshockOnline
  | DualshockOffline
  | DsBatteryChanged
  | DsError
  | DualshockSetConnection
  | DsAddListener
  | DsRemoveListener
  | DsOnData
  ;
