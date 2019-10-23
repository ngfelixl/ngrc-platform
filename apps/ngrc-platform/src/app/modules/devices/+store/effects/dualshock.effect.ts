import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { SocketService } from '../../../../services/socket.service';

import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DualshockState, DsWebsocket } from '@ngrc/dualshock-shared';
import { dualshockStateChanged, dualshockError, dualshockConnect, dualshockDisconnect } from '../actions';

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

  listenToDualshock = createEffect(() => this.actions$.pipe(
    ofType(dualshockConnect),
    switchMap(() => this.socketService.listen<DualshockState>(DsWebsocket.stateChange).pipe(
      map(dualshockState => dualshockStateChanged({ dualshockState })),
      catchError(error => of(dualshockError({ error })))
    ))
  ));

  disconnectFromDualshock = createEffect(() => this.actions$.pipe(
    ofType(dualshockDisconnect),
    tap(() => this.socketService.emit(DsWebsocket.disconnect))
  ), { dispatch: false });
}
