import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { SocketService } from '../../../../services/socket.service';

import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DualshockState, DsWebsocket } from '@ngrc/dualshock-shared';
import { dualshockListen, dualshockStateChanged, dualshockError } from '../actions';

@Injectable()
export class DualshockEffects {
  constructor(
    private actions$: Actions,
    private socketService: SocketService,
  ) {}

  dispatchListen = createEffect(() => this.actions$.pipe(
    ofType(dualshockListen),
    tap(() => this.socketService.emit(DsWebsocket.connect))
  ), { dispatch: false });

  listenToDualshock = createEffect(() => this.actions$.pipe(
    ofType(dualshockListen),
    switchMap(() => this.socketService.listen<DualshockState>(DsWebsocket.stateChange).pipe(
      map(dualshockState => dualshockStateChanged({ dualshockState })),
      catchError(error => of(dualshockError({ error })))
    ))
  ));
}
