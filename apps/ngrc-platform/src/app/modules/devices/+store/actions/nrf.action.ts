import { createAction, props } from '@ngrx/store';
import { Nrf24State, Nrf24Stats } from '@ngrc/interfaces/nrf24';

export const getNrfConfig = createAction(
  '[Devices] Get Nrf Config'
);

export const getNrfConfigSuccess = createAction(
  '[Devices] Get Nrf Config Success',
  props<{ nrfState: Nrf24State }>()
);

export const getNrfConfigFailed = createAction(
  '[Devices] Get Nrf Config Failed',
  props<{ error: any }>()
);

export const setNrfConfig = createAction(
  '[Devices] Set Nrf Config',
  props<Partial<Nrf24State>>()
);

export const setNrfConfigSuccess = createAction(
  '[Devices] Set Nrf Config Success',
  props<{ nrfState: Nrf24State }>()
);

export const setNrfConfigFailed = createAction(
  '[Devices] Set Nrf Config Failed',
  props<{ error: any }>()
);

export const nrfStartTransmission = createAction(
  '[Devices] Nrf Start Transmission'
);

export const nrfStopTransmission = createAction(
  '[Devices] Nrf Stop Transmission'
);

export const nrfStateChanged = createAction(
  '[Devices] Nrf State Changed',
  props<{ nrfState: Nrf24State }>()
);

export const nrfStatsChanged = createAction(
  '[Devices] Nrf Stats Changed',
  props<{ buffer: number[], nrfStats: Nrf24Stats }>()
);

export const nrfError = createAction(
  '[Devices] Nrf Error',
  props<{ error: any }>()
);

export const nrfStartTest = createAction(
  '[Devices] Nrf Start Test'
);

export const nrfStopTest = createAction(
  '[Devices] Nrf Stop Test'
);
