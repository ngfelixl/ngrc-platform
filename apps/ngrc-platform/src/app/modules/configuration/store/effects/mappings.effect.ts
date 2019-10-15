import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators';

import { MappingsService } from '../../services/mappings.service';
import { SocketService } from '../../../../services/socket.service';

import * as fromRoot from '../../../../+store';
import * as fromFeature from '../actions';
import { Store } from '@ngrx/store';

@Injectable()
export class MappingsEffects {
  constructor(
    private actions$: Actions,
    private mappingsService: MappingsService,
    private socketService: SocketService,
    private store: Store<fromRoot.State>
  ) {}

  @Effect()
  loadMappings$ = this.actions$.pipe(
    ofType(fromFeature.MappingsActionTypes.Load),
    switchMap((action) => {
      return this.mappingsService.getMappings().pipe(
        map(mappings => new fromFeature.LoadMappingsSuccess(mappings)),
        catchError(error => of(new fromFeature.LoadMappingsFailed(error)))
      );
    })
  );

  @Effect()
  addMapping$ = this.actions$.pipe(
      ofType(fromFeature.MappingsActionTypes.Add),
      withLatestFrom(this.store.select(fromRoot.getModelId)),
      switchMap(([action, id]) => {
        const temp = (action as any).payload;
        temp.model_id = id;
        return this.mappingsService.add(temp).pipe(
          map(mapping => {
            this.store.dispatch(new fromFeature.SelectMapping(mapping));
            return new fromFeature.AddMappingSuccess(mapping);
          }),
          catchError(error => of(new fromFeature.AddMappingFailed(error)))
        );
      })
    );

    @Effect()
    updateMapping$ = this.actions$.pipe(
        ofType(fromFeature.MappingsActionTypes.Update),
        switchMap((action: fromFeature.UpdateMapping) => {
          return this.mappingsService.update(action.payload).pipe(
            map((mapping) => {
              this.store.dispatch(new fromFeature.SelectMapping(mapping));
              return new fromFeature.UpdateMappingSuccess(mapping);
            }),
            catchError(error => of(new fromFeature.UpdateMappingFailed(error)))
          );
        })
      );

  @Effect()
  deleteMapping$ = this.actions$
    .pipe(
      ofType(fromFeature.MappingsActionTypes.Delete),
      switchMap((action: fromFeature.DeleteMapping) => {
        return this.mappingsService.delete(action.payload).pipe(
          map(() => new fromFeature.DeleteMappingSuccess()),
          catchError(error => of(new fromFeature.DeleteMappingFailed(error)))
        );
      })
    );

  @Effect({ dispatch: false })
  selectMapping$ = this.actions$
    .pipe(
      ofType(fromFeature.MappingsActionTypes.SelectMapping),
      switchMap((action: fromFeature.SelectMapping) => {
        this.socketService.emit('[Mapper] Set Mapping', action.payload);
        return of();
      })
    );
}
