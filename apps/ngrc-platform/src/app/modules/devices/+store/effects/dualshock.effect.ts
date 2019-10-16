import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { SocketService } from '../../../../services/socket.service';

import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import { dualshockAddListener, dualshockData, dualshockRemoveListener,
  dualshockRemoveManyListeners, dualshockAddManyListeners, dualshockAddAllListeners, dualshockRemoveAllListeners } from '../actions';
import { State } from '../reducers';
import { Store } from '@ngrx/store';
import { getDsListeners } from '../selectors';

@Injectable()
export class DualshockEffects {
  constructor(
    private actions$: Actions,
    private socketService: SocketService,
    private store: Store<State>
  ) {}

  addStickEvent$ = createEffect(() => this.actions$.pipe(
    ofType(dualshockAddListener),
    mergeMap(({ button }) => {
      if (!this.socketService.hasListener(`[Dualshock] ${button}`)) {
        this.socketService.emit('[Dualshock] Add Listener', button);
        return this.socketService.listen(`[Dualshock] ${button}`).pipe(
          map(value => dualshockData({ button, value })),
          catchError(error => of(error))
        );
      } else {
        return EMPTY;
      }
    })
  ));

  removeStickEvent$ = createEffect(() => this.actions$.pipe(
    ofType(dualshockRemoveListener),
    withLatestFrom(this.store.select(getDsListeners)),
    map(([payload, listeners]) => {
      const listener = listeners[payload.button];

      if (listener.count === 0 || !listener) {
        this.socketService.emit('[Dualshock] Remove Listener', payload.button);
        this.socketService.off(`[Dualshock] ${payload.button}`);
      }
    })
  ), { dispatch: false });

  addManyListeners$ = createEffect(() => this.actions$.pipe(
    ofType(dualshockAddManyListeners),
    mergeMap(({ buttons }) => buttons.map(button => dualshockAddListener({ button })))
  ));

  removeManyListeners$ = createEffect(() => this.actions$.pipe(
    ofType(dualshockRemoveManyListeners),
    mergeMap(({ buttons }) => buttons.map(button => dualshockRemoveListener({ button })))
  ));

  addAllListeners$ = createEffect(() => this.actions$.pipe(
    ofType(dualshockAddAllListeners),
    mergeMap(() => [
      dualshockAddListener({ button: 'right' }),
      dualshockAddListener({ button: 'r2' }),
      dualshockAddListener({ button: 'l2' }),
      dualshockAddListener({ button: 'x' }),
      dualshockAddListener({ button: 'circle' }),
      dualshockAddListener({ button: 'triangle' }),
      dualshockAddListener({ button: 'square' }),
      dualshockAddListener({ button: 'dpadup' }),
      dualshockAddListener({ button: 'dpaddown' }),
      dualshockAddListener({ button: 'dpadleft' }),
      dualshockAddListener({ button: 'dpadright' }),
      dualshockAddListener({ button: 'r1' }),
      dualshockAddListener({ button: 'l1' })
    ])
  ));

  removeAllListeners$ = createEffect(() => this.actions$.pipe(
    ofType(dualshockRemoveAllListeners),
    mergeMap(() => [
      dualshockRemoveListener({ button: 'right' }),
      dualshockRemoveListener({ button: 'r2' }),
      dualshockRemoveListener({ button: 'l2' }),
      dualshockRemoveListener({ button: 'x' }),
      dualshockRemoveListener({ button: 'circle' }),
      dualshockRemoveListener({ button: 'triangle' }),
      dualshockRemoveListener({ button: 'square' }),
      dualshockRemoveListener({ button: 'dpadup' }),
      dualshockRemoveListener({ button: 'dpaddown' }),
      dualshockRemoveListener({ button: 'dpadleft' }),
      dualshockRemoveListener({ button: 'dpadright' }),
      dualshockRemoveListener({ button: 'r1' }),
      dualshockRemoveListener({ button: 'l1' })
    ])
  ));
}
