import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, tap } from 'rxjs/operators';

import * as fromRoot from '../../../../+store';
import { ModelsService } from '../../services/models.service';
import { Store } from '@ngrx/store';
import { loadModels, loadModelsSuccess, loadModelsFailed, addModel, addModelSuccess,
  addModelFailed, deleteModel, deleteModelSuccess, deleteModelFailed } from '../actions';

@Injectable()
export class ModelsEffects {
  constructor(
    private actions$: Actions,
    private modelsService: ModelsService,
    private store: Store<fromRoot.State>,
    private router: Router
  ) {}

  loadModels$ = createEffect(() => this.actions$.pipe(
    ofType(loadModels),
    switchMap(() => this.modelsService.getModels().pipe(
      map(models => loadModelsSuccess({ models })),
      catchError(error => of(loadModelsFailed({ error })))
    ))
  ));

  addModel$ = createEffect(() => this.actions$.pipe(
    ofType(addModel),
    switchMap(({ model }) => this.modelsService.add(model).pipe(
      map((modelWithId) => addModelSuccess({ model: modelWithId })),
      catchError(error => of(addModelFailed({ error })))
    ))
  ));

  addModelSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(addModelSuccess),
    tap(({ model }) => this.router.navigate(['models', model.id]))
  ), { dispatch: false });

  deleteModel$ = createEffect(() => this.actions$.pipe(
    ofType(deleteModel),
    withLatestFrom(this.store.select(fromRoot.getModelId)),
    switchMap(([, id]) => this.modelsService.delete(id).pipe(
      map(() => { this.router.navigate(['models']); return deleteModelSuccess({ id }); }),
      catchError(error => of(deleteModelFailed({ error })))
    ))
  ));
}
