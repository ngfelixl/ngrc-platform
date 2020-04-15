import { createAction, props } from '@ngrx/store';
import { SystemReport } from '@ngrc/interfaces/system-report';

export const listenToRaspberrypi = createAction(
  '[Devices] Rasbperrypi Listen'
);

export const unlistenToRaspberrypi = createAction(
  '[Devices] Raspberrypi Unlisten'
);

export const systemReportChanged = createAction(
  '[Devices] Raspberrypi System Report changed',
  props<{ systemReport: SystemReport }>()
);

export const raspberrypiError = createAction(
  '[Devices] Dualshock Error',
  props<{ error: string }>()
);