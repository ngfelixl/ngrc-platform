import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { SocketService } from '../../../../services/socket.service';

import { catchError, map, switchMap, tap, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs';
import { RaspberrypiWebsocket } from '@ngrc/interfaces/websockets';
import { listenToRaspberrypi, unlistenToRaspberrypi, raspberrypiError, systemReportChanged } from '../actions';
import { SystemReport } from '@ngrc/interfaces/system-report';

@Injectable()
export class RaspberrypiEffects {
  constructor(
    private actions$: Actions,
    private socketService: SocketService,
  ) {}

  listen$ = createEffect(() => this.actions$.pipe(
    ofType(listenToRaspberrypi),
    switchMap(() => this.socketService.listen<SystemReport>(RaspberrypiWebsocket.readSystemReport).pipe(
      takeUntil(this.actions$.pipe(ofType(unlistenToRaspberrypi))),
      map(systemReport => systemReportChanged({ systemReport })),
      catchError(error => of(raspberrypiError({ error })))
    ))
  ));

  unlisten$ = createEffect(() => this.actions$.pipe(
    ofType(unlistenToRaspberrypi),
    tap(() => this.socketService.emit(RaspberrypiWebsocket.unreadSystemReport))
  ), { dispatch: false });
}
