import { Action } from '@ngrx/store';
import { NrfState } from '../../models/nrf-state';

export enum NrfActionTypes {
  GetConfig = '[Devices] Get Nrf Config',
  GetConfigSuccess = '[Devices] Get Nrf Config Success',
  GetConfigFailed = '[Devices] Get Nrf Config Failed',

  SetConfig = '[Devices] Set Nrf Config',
  SetConfigSuccess = '[Devices] Set Nrf Config Success',
  SetConfigFailed = '[Devices] Set Nrf Config Failed',

  StartTest = '[Devices] Nrf Start Test',
  StartTestSuccess = '[Devices] Nrf Start Test Success',
  StartTestFailed = '[Devices] Nrf Start Test Failed',

  StopTest = '[Devices] Nrf Stop Test',
  StopTestSuccess = '[Devices] Nrf Stop Test Success',
  StopTestFailed = '[Devices] Nrf Stop Test Failed',

  StartTransmission = '[Devices] Nrf Start Transmission',
  StartTransmissionSuccess = '[Devices] Nrf Start Transmission Success',
  StartTransmissionFailed = '[Devices] Nrf Start Transmission Failed',

  StopTransmission = '[Devices] Nrf Stop Transmission',
  StopTransmissionSuccess = '[Devices] Nrf Stop Transmission Success',
  StopTransmissionFailed = '[Devices] Nrf Stop Transmission Failed'
}

export class GetNrfConfig implements Action {
  readonly type = NrfActionTypes.GetConfig;
}

export class GetNrfConfigSuccess implements Action {
  readonly type = NrfActionTypes.GetConfigSuccess;
  constructor(public config: NrfState) {}
}

export class GetNrfConfigFailed implements Action {
  readonly type = NrfActionTypes.GetConfigFailed;
  constructor(public payload: any) {}
}

export class NrfSetConfig implements Action {
  readonly type = NrfActionTypes.SetConfig;
  constructor(public payload: any) {}
}

export class NrfSetConfigSuccess implements Action {
  readonly type = NrfActionTypes.SetConfigSuccess;
  constructor(public config: NrfState) {}
}

export class NrfSetConfigFailed implements Action {
  readonly type = NrfActionTypes.SetConfigFailed;
  constructor(public payload: any) {}
}

export class NrfStartTest implements Action { readonly type = NrfActionTypes.StartTest; }
export class NrfStartTestSuccess implements Action {
  readonly type = NrfActionTypes.StartTestSuccess;
  constructor(public config: NrfState) {}
}
export class NrfStartTestFailed implements Action {
  readonly type = NrfActionTypes.StartTestFailed;
  constructor(public payload: any) {}
}
export class NrfStopTest implements Action { readonly type = NrfActionTypes.StopTest; }
export class NrfStopTestSuccess implements Action {
  readonly type = NrfActionTypes.StopTestSuccess;
  constructor(public config: NrfState) {}
}
export class NrfStopTestFailed implements Action {
  readonly type = NrfActionTypes.StopTestFailed;
  constructor(public payload: any) {}
}
export class NrfStartTransmission implements Action { readonly type = NrfActionTypes.StartTransmission; }
export class NrfStartTransmissionSuccess implements Action {
  readonly type = NrfActionTypes.StartTransmissionSuccess;
  constructor(public config: NrfState) {}
}
export class NrfStartTransmissionFailed implements Action {
  readonly type = NrfActionTypes.StartTransmissionFailed;
  constructor(public payload: any) {}
}
export class NrfStopTransmission implements Action { readonly type = NrfActionTypes.StopTransmission; }
export class NrfStopTransmissionSuccess implements Action {
  readonly type = NrfActionTypes.StopTransmissionSuccess;
  constructor(public config: NrfState) {}
}
export class NrfStopTransmissionFailed implements Action {
  readonly type = NrfActionTypes.StopTransmissionFailed;
  constructor(public payload: any) {}
}

export type NrfActions =
GetNrfConfig
| GetNrfConfigSuccess
| GetNrfConfigFailed
| NrfSetConfig
| NrfSetConfigSuccess
| NrfSetConfigFailed
| NrfStartTest
| NrfStartTestSuccess
| NrfStartTestFailed
| NrfStopTest
| NrfStopTestSuccess
| NrfStopTestFailed
| NrfStartTransmission
| NrfStartTransmissionSuccess
| NrfStartTransmissionFailed
| NrfStopTransmission
| NrfStopTransmissionSuccess
| NrfStopTransmissionFailed;
