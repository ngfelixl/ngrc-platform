import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { switchMap, withLatestFrom, catchError, map } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';

import { SocketState } from '../reducers/socket.reducer';
import { addSocketListener, newSocketData, removeSocketListener } from '../actions';
import { getSocketListeners } from '../selectors';
import { SocketService } from '../../services/socket.service';

@Injectable()
export class SocketEffect {
  constructor(
    private actions$: Actions,
    private socketService: SocketService,
    private store: Store<SocketState>
  ) {}



  addListener$ = createEffect(() => this.actions$.pipe(
    ofType(addSocketListener),
    withLatestFrom(this.store.select(getSocketListeners)),
    switchMap(([action, listeners]) => {
      const listener = (action as any).payload;
      console.log('Try to register listener', listeners, listener);
      if (!this.socketService.hasListener(listener)) {
        return this.socketService.listen(listener).pipe(
          map(data => newSocketData({ listener, data })),
          catchError(error => of(error))
        );
      }
      return EMPTY;
    })
  ));

  removeListener$ = createEffect(() => this.actions$.pipe(
    ofType(removeSocketListener),
    withLatestFrom(this.store.select(getSocketListeners)),
    switchMap(([action, listeners]) => {
      const listenTo = (action as any).payload;
      if (!listeners[listenTo]) {
        this.socketService.off(listenTo);
      }
      return of();
    })
  ), { dispatch: false });
}
