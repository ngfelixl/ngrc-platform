import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, tap } from 'rxjs/operators';

import { MappingsService } from '../../services/mappings.service';
import { SocketService } from '../../../../services/socket.service';

import * as fromRoot from '../../../../+store';
import { Store } from '@ngrx/store';
import { loadMappings, loadMappingsSuccess, loadMappingsFailed, addMapping,
  selectMapping, addMappingSuccess, addMappingFailed, updateMapping, updateMappingSuccess,
  updateMappingFailed, deleteMapping, deleteMappingSuccess, deleteMappingFailed } from '../actions';

@Injectable()
export class MappingsEffects {
  constructor(
    private actions$: Actions,
    private mappingsService: MappingsService,
    private socketService: SocketService,
    private store: Store<fromRoot.State>
  ) {}

  loadMappings$ = createEffect(() => this.actions$.pipe(
    ofType(loadMappings),
    switchMap(() => {
      return this.mappingsService.getMappings().pipe(
        map(mappings => loadMappingsSuccess({ mappings })),
        catchError(error => of(loadMappingsFailed({ error })))
      );
    })
  ));

  addMapping$ = createEffect(() => this.actions$.pipe(
    ofType(addMapping),
    withLatestFrom(this.store.select(fromRoot.getModelId)),
    switchMap(([{ mapping }, id]) => {
      return this.mappingsService.add({...mapping, modelId: id}).pipe(
        map(mappingResult => addMappingSuccess({ mapping: mappingResult })),
        catchError(error => of(addMappingFailed(error)))
      );
    })
  ));

  addMappingSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(addMappingSuccess),
    map(({ mapping }) => selectMapping({id: mapping.id}))
  ));

  updateMappingSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(updateMappingSuccess),
    map(({ id }) => selectMapping({ id }))
  ));

  updateMapping$ = createEffect(() => this.actions$.pipe(
    ofType(updateMapping),
    switchMap((changes) => {
      return this.mappingsService.update(changes).pipe(
        map(() => updateMappingSuccess(changes)),
        catchError(error => of(updateMappingFailed({ error })))
      );
    })
  ));

  deleteMapping$ = createEffect(() => this.actions$.pipe(
    ofType(deleteMapping),
    switchMap(({ id }) => {
      return this.mappingsService.delete(id).pipe(
        map(() => deleteMappingSuccess()),
        catchError(error => of(deleteMappingFailed({ error })))
      );
    })
  ));

  selectMapping$ = createEffect(() => this.actions$.pipe(
    ofType(selectMapping),
    tap(({ id }) => {
      this.socketService.emit('[Mapper] Set Mapping', id);
    })
  ), { dispatch: false });
}
