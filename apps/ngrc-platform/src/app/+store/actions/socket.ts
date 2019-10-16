import { createAction, props } from '@ngrx/store';


export const socketConnected = createAction(
  '[Socket] Connected'
);

export const socketDisconnected = createAction(
  '[Socket] Disconnected'
);

export const addSocketListener = createAction(
  '[Socket] Add Listener',
  props<{ key: string }>()
);

export const removeSocketListener = createAction(
  '[Socket] Remove Listener',
  props<{ key: string }>()
);

export const newSocketData = createAction(
  '[Socket] New Data',
  props<{ listener: string, data: any }>()
);
