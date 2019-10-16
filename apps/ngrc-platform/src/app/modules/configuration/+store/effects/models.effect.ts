import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators';

import * as fromRoot from '../../../../+store';
import * as fromFeature from '../actions';
import { ModelsService } from '../../services/models.service';
import { Store } from '@ngrx/store';

@Injectable()
export class ModelsEffects {
  constructor(
    private actions$: Actions,
    private modelsService: ModelsService,
    private store: Store<fromRoot.State>,
    private router: Router
  ) {}

  @Effect()
  loadModels$ = this.actions$
    .pipe(
      ofType(fromFeature.ModelsActionTypes.Load),
      switchMap(() => {
        return this.modelsService.getModels().pipe(
          map(models => new fromFeature.LoadModelsSuccess(models)),
          catchError(error => of(new fromFeature.LoadModelsFailed(error)))
        );
      })
    );

  @Effect()
  addModel$ = this.actions$
    .pipe(
      ofType(fromFeature.ModelsActionTypes.Add),
      switchMap((action: fromFeature.AddModel) => {
        return this.modelsService.add(action.payload).pipe(
          map(model => new fromFeature.AddModelSuccess(model)),
          catchError(error => of(new fromFeature.AddModelFailed(error)))
        );
      })
    );

  @Effect({ dispatch: false })
  addModelSuccess$ = this.actions$
    .pipe(
      ofType(fromFeature.ModelsActionTypes.AddSuccess),
      switchMap((action: fromFeature.AddModelSuccess) => this.router.navigate(['models', action.payload.id]))
    );

  @Effect()
  deleteModel$ = this.actions$
    .pipe(
      ofType(fromFeature.ModelsActionTypes.Delete),
      withLatestFrom(this.store.select(fromRoot.getModelId)),
      switchMap(([action, id]) => {
        return this.modelsService.delete(id).pipe(
          map(() => { this.router.navigate(['models']); return new fromFeature.DeleteModelSuccess(id); }),
          catchError(error => of(new fromFeature.DeleteModelFailed(error)))
        );
      })
    );
}
