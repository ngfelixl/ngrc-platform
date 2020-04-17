import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { SocketService } from '../../../../services/socket.service';

import { catchError, map, switchMap, tap, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs';
import { DualshockState, Controller, DualshockConfig } from '@ngrc/interfaces/dualshock';
import { DsWebsocket } from '@ngrc/interfaces/websockets';
import { dualshockStateChanged, dualshockError, dualshockConnect,
  dualshockValuesChanged, listenToDualshock, unlistenToDualshock, setDualshockConfig,
  setDualshockConfigSuccess, setDualshockConfigFailed, loadDualshockConfig, loadDualshockConfigSuccess, loadDualshockConfigFailed } from '../actions';

@Injectable()
export class DualshockEffects {
  constructor(
    private actions$: Actions,
    private socketService: SocketService,
  ) {}

  setConfig$ = createEffect(() => this.actions$.pipe(
    ofType(setDualshockConfig),
    switchMap(({ config }) => this.socketService.request<DualshockConfig>(DsWebsocket.setConfig, config).pipe(
      map(() => setDualshockConfigSuccess({ config })),
      catchError(error => of(setDualshockConfigFailed({ error })))
    ))
  ));

  loadConfig$ = createEffect(() => this.actions$.pipe(
    ofType(loadDualshockConfig),
    switchMap(() => this.socketService.request<DualshockConfig>(DsWebsocket.getConfig).pipe(
      map((config) => loadDualshockConfigSuccess({ config })),
      catchError(error => of(loadDualshockConfigFailed({ error })))
    ))
  ));

  dispatchListen = createEffect(() => this.actions$.pipe(
    ofType(dualshockConnect),
    tap(() => this.socketService.emit(DsWebsocket.connect))
  ), { dispatch: false });

  listenToDualshockState$ = createEffect(() => this.actions$.pipe(
    ofType(dualshockConnect),
    switchMap(() => this.socketService.listen<DualshockState>(DsWebsocket.stateChange).pipe(
      map(dualshockState => dualshockStateChanged({ dualshockState })),
      catchError(error => of(dualshockError({ error })))
    ))
  ));

  listenToDualshockValues$ = createEffect(() => this.actions$.pipe(
    ofType(listenToDualshock),
    tap(() => this.socketService.emit(DsWebsocket.listen)),
    switchMap(() => this.socketService.listen<Controller>(DsWebsocket.valueChange).pipe(
      map((controller) => dualshockValuesChanged({ controller })),
      catchError(error => of(dualshockError({ error }))),
      takeUntil(this.actions$.pipe(ofType(unlistenToDualshock)))
    ))
  ));

  disconnectFromDualshock = createEffect(() => this.actions$.pipe(
    ofType(unlistenToDualshock),
    tap(() => this.socketService.emit(DsWebsocket.unlisten))
  ), { dispatch: false });
}
