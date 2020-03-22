import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { SocketService } from '../../../../services/socket.service';

import { catchError, map, switchMap, tap, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs';
import { DualshockState, Controller } from '@ngrc/interfaces/dualshock';
import { DsWebsocket } from '@ngrc/interfaces/websockets';
import { dualshockStateChanged, dualshockError, dualshockConnect, dualshockDisconnect, dualshockValuesChanged, listenToDualshock, unlistenToDualshock } from '../actions';

@Injectable()
export class DualshockEffects {
  constructor(
    private actions$: Actions,
    private socketService: SocketService,
  ) {}

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
      takeUntil(this.actions$.pipe(ofType(unlistenToDualshock))),
      map((controller) => dualshockValuesChanged({ controller })),
      catchError(error => of(dualshockError({ error })))
    ))
  ));

  disconnectFromDualshock = createEffect(() => this.actions$.pipe(
    ofType(dualshockDisconnect),
    tap(() => this.socketService.emit(DsWebsocket.unlisten))
  ), { dispatch: false });
}
