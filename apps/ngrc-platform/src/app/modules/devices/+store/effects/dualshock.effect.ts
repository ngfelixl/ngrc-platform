import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SocketService } from '../../../../services/socket.service';

import * as fromFeature from '../actions';
import * as fromFeatureReducers from '../reducers';
import * as fromFeatureSelectors from '../selectors';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class DualshockEffects {
  constructor(
    private actions$: Actions,
    private socketService: SocketService,
    private store: Store<fromFeatureReducers.State>
  ) {}

  @Effect()
  addStickEvent$ = this.actions$
    .pipe(
      ofType(fromFeature.DualshockActionTypes.AddListener),
      mergeMap((action: fromFeature.DsAddListener) => {
        if (!this.socketService.hasListener(`[Dualshock] ${action.key}`)) {
          this.socketService.emit('[Dualshock] Add Listener', action.key);
          return this.socketService.listen(`[Dualshock] ${action.key}`).pipe(
            map(data => new fromFeature.DsOnData(action.key, data)),
            catchError(error => of(error))
          );
        } else {
          return of();
        }
      })
    );

  @Effect({ dispatch: false })
  remvoeStickEvent$ = this.actions$
    .pipe(
      ofType(fromFeature.DualshockActionTypes.RemoveListener),
      withLatestFrom(this.store.select(fromFeatureSelectors.getDsListeners)),
      mergeMap(([actionPayload, listeners]) => {
        const action = actionPayload as fromFeature.DsAddListener;
        if (listeners[action.key].count === 0 || !listeners[action.key]) {
          this.socketService.emit('[Dualshock] Remove Listener', action.key);
          this.socketService.off(`[Dualshock] ${action.key}`);
        } else {
          return of();
        }
      })
    );
}
