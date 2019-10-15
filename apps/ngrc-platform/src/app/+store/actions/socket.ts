import { Action } from '@ngrx/store';

export enum SocketActionTypes {
  SocketConnected = '[Socket] Connected',
  SocketDisconnected = '[Socket] Disconnected',

  AddListener = '[Socket] Add Listener',
  RemoveListener = '[Socket] Remove Listener',

  OnData = '[Socket] On Data'
}

export class SocketConnected implements Action {
  readonly type = SocketActionTypes.SocketConnected;
}

export class SocketDisconnected implements Action {
  readonly type = SocketActionTypes.SocketDisconnected;
}

export class AddListener implements Action {
  readonly type = SocketActionTypes.AddListener;
  constructor(public payload: string) {}
}

export class RemoveListener implements Action {
  readonly type = SocketActionTypes.RemoveListener;
  constructor(public payload: string) {}
}

export class OnSocketData implements Action {
  readonly type = SocketActionTypes.OnData;
  constructor(public listener: string, public data: any) {}
}

export type SocketActionsUnion =
  SocketConnected
  | SocketDisconnected
  | AddListener
  | RemoveListener
  | OnSocketData;
