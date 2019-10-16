import { createAction, props } from '@ngrx/store';
import { Nrf } from '../../models';

export const getNrfConfig = createAction(
  '[Devices] Get Nrf Config'
);

export const getNrfConfigSuccess = createAction(
  '[Devices] Get Nrf Config Success',
  props<{ nrfState: Nrf }>()
);

export const getNrfConfigFailed = createAction(
  '[Devices] Get Nrf Config Failed',
  props<{ error: any }>()
);

export const setNrfConfig = createAction(
  '[Devices] Set Nrf Config',
  props<Partial<Nrf>>()
);

export const setNrfConfigSuccess = createAction(
  '[Devices] Set Nrf Config Success',
  props<{ nrfState: Nrf }>()
);

export const setNrfConfigFailed = createAction(
  '[Devices] Set Nrf Config Failed',
  props<{ error: any }>()
);

export const startNrfTest = createAction(
  '[Devices] Start Nrf Test'
);

export const startNrfTestSuccess = createAction(
  '[Devices] Start Nrf Test Success',
  props<{ nrfState: Nrf }>()
);

export const startNrfTestFailed = createAction(
  '[Devices] Start Nrf Test Failed',
  props<{ error: any }>()
);

export const stopNrfTest = createAction(
  '[Devices] Stop Nrf Test'
);

export const stopNrfTestSuccess = createAction(
  '[Devices] Stop Nrf Test Success',
  props<{ nrfState: Nrf }>()
);

export const stopNrfTestFailed = createAction(
  '[Devices] Stop Nrf Test Failed',
  props<{ error: any }>()
);

export const nrfStartTransmission = createAction(
  '[Devices] Nrf Start Transmission'
);

export const nrfStartTransmissionSuccess = createAction(
  '[Devices] Nrf Start Transmission Success',
  props<{ nrfState: Nrf }>()
);

export const nrfStartTransmissionFailed = createAction(
  '[Devices] Nrf Start Transmission Failed',
  props<{ error: any }>()
);

export const nrfStopTransmission = createAction(
  '[Devices] Nrf Stop Transmission'
);

export const nrfStopTransmissionSuccess = createAction(
  '[Devices] Nrf Stop Transmission Success',
  props<{ nrfState: Nrf }>()
);

export const nrfStopTransmissionFailed = createAction(
  '[Devices] Nrf Stop Transmission Failed',
  props<{ error: any }>()
);
