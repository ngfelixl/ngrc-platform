import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SocketService } from '../../../../services/socket.service';
import { Nrf } from '../../models';
import { getNrfConfig, getNrfConfigSuccess, getNrfConfigFailed, setNrfConfig, setNrfConfigSuccess,
  setNrfConfigFailed, startNrfTest, startNrfTestSuccess, startNrfTestFailed, stopNrfTest, stopNrfTestSuccess,
  stopNrfTestFailed, nrfStartTransmission, nrfStartTransmissionSuccess, nrfStartTransmissionFailed,
  nrfStopTransmission, nrfStopTransmissionSuccess, nrfStopTransmissionFailed } from '../actions';
import { NrfWebsocket } from '@ngrc/dualshock-shared';

@Injectable()
export class NrfEffects {
  constructor(
    private actions$: Actions,
    private socketService: SocketService
  ) {}

  getState$ = createEffect(() => this.actions$.pipe(
    ofType(getNrfConfig),
    switchMap(() => this.socketService.request(NrfWebsocket.getConfig).pipe(
      map((nrfState: Nrf) => getNrfConfigSuccess({ nrfState })),
      catchError(error => of(getNrfConfigFailed({ error })))
    ))
  ));

  setState$ = createEffect(() => this.actions$.pipe(
    ofType(setNrfConfig),
    switchMap((partialNrfState) => this.socketService.request(NrfWebsocket.setConfig, partialNrfState).pipe(
      map((nrfState: Nrf) => setNrfConfigSuccess({ nrfState })),
      catchError(error => of(setNrfConfigFailed({ error })))
    ))
  ));

  startTest$ = createEffect(() => this.actions$.pipe(
    ofType(startNrfTest),
    switchMap(() => this.socketService.request('[Nrf] Start Test').pipe(
      map((nrfState: Nrf) => startNrfTestSuccess({ nrfState })),
      catchError(error => of(startNrfTestFailed({ error })))
    ))
  ));

  stopTest$ = createEffect(() => this.actions$.pipe(
    ofType(stopNrfTest),
    switchMap(() => this.socketService.request('[Nrf] Stop Test').pipe(
      map((nrfState: Nrf) => stopNrfTestSuccess({ nrfState })),
      catchError(error => of(stopNrfTestFailed({ error })))
    ))
  ));

  startTransmission$ = createEffect(() => this.actions$.pipe(
    ofType(nrfStartTransmission),
    switchMap(() => this.socketService.request(NrfWebsocket.startTransmission).pipe(
      map((nrfState: Nrf) => nrfStartTransmissionSuccess({ nrfState })),
      catchError(error => of(nrfStartTransmissionFailed({ error })))
    ))
  ));

  stopTransmission$ = createEffect(() => this.actions$.pipe(
    ofType(nrfStopTransmission),
    switchMap(() => this.socketService.request(NrfWebsocket.stopTransmission).pipe(
      map((nrfState: Nrf) => nrfStopTransmissionSuccess({ nrfState })),
      catchError(error => of(nrfStopTransmissionFailed({ error })))
    ))
  ));
}
