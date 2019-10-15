import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromFeature from '../actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SocketService } from '../../../../services/socket.service';
import { NrfState } from '../../models/nrf-state';

@Injectable()
export class NrfEffects {
  constructor(
    private actions$: Actions,
    private socketService: SocketService
  ) {}

  @Effect()
  getState$ = this.actions$
    .pipe(
      ofType(fromFeature.NrfActionTypes.GetConfig),
      switchMap(() => {
        return this.socketService.request('[Nrf] Get Config').pipe(
          map((config: NrfState) => new fromFeature.GetNrfConfigSuccess(config)),
          catchError(error => of(new fromFeature.GetNrfConfigFailed(error)))
        );
      })
    );

  @Effect()
  setConfig$ = this.actions$
    .pipe(
      ofType(fromFeature.NrfActionTypes.SetConfig),
      switchMap((action: fromFeature.NrfSetConfig) => {
        console.log(action.payload);
        return this.socketService.request('[Nrf] Set Config', action.payload).pipe(
          map((config: NrfState) => new fromFeature.NrfSetConfigSuccess(config)),
          catchError((error) => of(new fromFeature.NrfSetConfigFailed(error)))
        );
      })
    );

  @Effect()
  startTest$ = this.actions$
    .pipe(
      ofType(fromFeature.NrfActionTypes.StartTest),
      switchMap(() => {
        return this.socketService.request('[Nrf] Start Test').pipe(
          map((config: NrfState) => new fromFeature.NrfStartTestSuccess(config)),
          catchError((error) => of(new fromFeature.NrfStartTestFailed(error)))
        );
      })
    );

  @Effect()
  stopTest$ = this.actions$
    .pipe(
      ofType(fromFeature.NrfActionTypes.StopTest),
      switchMap(() => {
        return this.socketService.request('[Nrf] Stop Test').pipe(
          map((config: NrfState) => new fromFeature.NrfStopTestSuccess(config)),
          catchError((error) => of(new fromFeature.NrfStopTestFailed(error)))
        );
      })
    );

  @Effect()
  startTransmission$ = this.actions$
    .pipe(
      ofType(fromFeature.NrfActionTypes.StartTransmission),
      switchMap(() => {
        return this.socketService.request('[Nrf] Start Transmission').pipe(
          map((config: NrfState) => new fromFeature.NrfStartTransmissionSuccess(config)),
          catchError((error) => of(new fromFeature.NrfStartTransmissionFailed(error)))
        );
      })
    );

  @Effect()
  stopTransmission$ = this.actions$
    .pipe(
      ofType(fromFeature.NrfActionTypes.StopTransmission),
      switchMap(() => {
        return this.socketService.request('[Nrf] Stop Transmission').pipe(
          map((config: NrfState) => new fromFeature.NrfStopTransmissionSuccess(config)),
          catchError((error) => of(new fromFeature.NrfStopTransmissionFailed(error)))
        );
      })
    );
}
