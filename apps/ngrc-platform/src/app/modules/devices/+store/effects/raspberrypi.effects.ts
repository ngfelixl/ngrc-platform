import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { SocketService } from '../../../../services/socket.service';

import { catchError, map, switchMap, tap, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs';
import { RaspberrypiWebsocket } from '@ngrc/interfaces/websockets';
import { listenToRaspberrypi, unlistenToRaspberrypi, raspberrypiError, systemReportChanged } from '../actions';
import { SystemReport } from '@ngrc/interfaces/raspberrypi';

@Injectable()
export class RaspberrypiEffects {
  constructor(
    private actions$: Actions,
    private socketService: SocketService,
  ) {}

  listen$ = createEffect(() => this.actions$.pipe(
    ofType(listenToRaspberrypi),
    tap(() => console.log('Read')),
    tap(() => this.socketService.emit(RaspberrypiWebsocket.readSystemReport)),
    switchMap(() => this.socketService.listen<SystemReport>(RaspberrypiWebsocket.systemReport).pipe(
      map(systemReport => systemReportChanged({ systemReport })),
      catchError(error => of(raspberrypiError({ error }))),
      takeUntil(this.actions$.pipe(ofType(unlistenToRaspberrypi)))
    ))
  ));

  unlisten$ = createEffect(() => this.actions$.pipe(
    ofType(unlistenToRaspberrypi),
    tap(() => { console.log('Unread'); this.socketService.emit(RaspberrypiWebsocket.unreadSystemReport) })
  ), { dispatch: false });
}
