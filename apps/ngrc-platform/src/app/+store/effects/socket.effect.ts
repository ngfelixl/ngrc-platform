import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import * as fromRoot from '../reducers';
import * as fromSocket from '../actions/socket';
import * as fromSelectors from '../selectors/socket.selector';
import { switchMap, withLatestFrom, catchError, map } from 'rxjs/operators';

import { SocketService } from '../../services/socket.service';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

@Injectable()
export class SocketEffect {
  constructor(
    private actions$: Actions,
    private socketService: SocketService,
    private store: Store<fromRoot.State>
  ) {}

  @Effect()
  addListener$ = this.actions$.pipe(
      ofType(fromSocket.SocketActionTypes.AddListener),
      withLatestFrom(this.store.select(fromSelectors.getSocketListeners)),
      switchMap(([action, listeners]) => {
        const listenTo = (action as any).payload;
        console.log('Try to register listener', listeners, listenTo);
        if (!this.socketService.hasListener(listenTo)) {
          return this.socketService.listen(listenTo).pipe(
            map(data => new fromSocket.OnSocketData(listenTo, data)),
            catchError(error => of(error))
          );
        }
        return of();
      })
    );

  @Effect({dispatch: false})
  removeListener$ = this.actions$.pipe(
      ofType(fromSocket.SocketActionTypes.RemoveListener),
      withLatestFrom(this.store.select(fromSelectors.getSocketListeners)),
      switchMap(([action, listeners]) => {
        const listenTo = (action as any).payload;
        if (!listeners[listenTo]) {
          this.socketService.off(listenTo);
        }
        return of();
      })
    );
}
