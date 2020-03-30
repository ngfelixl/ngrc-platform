import { Injectable } from '@angular/core';
import { Nrf24State, Nrf24Stats } from '@ngrc/interfaces/nrf24';
import { NrfWebsocket } from '@ngrc/interfaces/websockets';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SocketService } from '../../../../services/socket.service';
import { nrfError, nrfStartTest, nrfStartTransmission, nrfStateChanged, nrfStatsChanged, nrfStopTest, nrfStopTransmission, setNrfConfig, setNrfConfigFailed, setNrfConfigSuccess } from '../actions';

@Injectable()
export class NrfEffects {
  constructor(
    private actions$: Actions,
    private socketService: SocketService
  ) {}

  setState$ = createEffect(() => this.actions$.pipe(
    ofType(setNrfConfig),
    switchMap((partialNrfState) => this.socketService.request(NrfWebsocket.setConfig, partialNrfState).pipe(
      map((nrfState: Nrf24State) => setNrfConfigSuccess({ nrfState })),
      catchError(error => of(setNrfConfigFailed({ error })))
    ))
  ));

  startTransmission$ = createEffect(() => this.actions$.pipe(
    ofType(nrfStartTransmission),
    switchMap(() => this.socketService.request(NrfWebsocket.startTransmission).pipe(
      map((nrfState: Nrf24State) => nrfStateChanged({ nrfState })),
      catchError(error => of(nrfError({ error })))
    ))
  ));

  listenToNrfState = createEffect(() => this.socketService.listen<Nrf24State>(NrfWebsocket.state).pipe(
    map(nrfState => nrfStateChanged({ nrfState })),
    catchError(error => of(nrfError({ error })))
  ));

  listenToNrfStats = createEffect(() => this.socketService.listen<{ buffer: number[], stats: Nrf24Stats }>(NrfWebsocket.stats).pipe(
    map(({buffer, stats}) => nrfStatsChanged({ buffer, nrfStats: stats })),
    catchError(error => of(nrfError({ error })))
  ));

  stopTransmission$ = createEffect(() => this.actions$.pipe(
    ofType(nrfStopTransmission),
    switchMap(() => this.socketService.request(NrfWebsocket.stopTransmission).pipe(
      map((nrfState: Nrf24State) => nrfStateChanged({ nrfState })),
      catchError(error => of(nrfError({ error })))
    ))
  ));

  startTest$ = createEffect(() => this.actions$.pipe(
    ofType(nrfStartTest),
    switchMap(() => this.socketService.request(NrfWebsocket.startTest))
  ), { dispatch: false });

  stopTest$ = createEffect(() => this.actions$.pipe(
    ofType(nrfStopTest),
    switchMap(() => this.socketService.request(NrfWebsocket.stopTest))
  ), { dispatch: false })
}
