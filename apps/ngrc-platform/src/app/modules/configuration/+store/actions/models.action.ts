import { createAction, props } from '@ngrx/store';
import { Model } from '../../models/model';

export const loadModels = createAction(
  '[Configuration] Load Models'
);

export const loadModelsSuccess = createAction(
  '[Configuration] Load Models Success',
  props<{ models: Model[] }>()
);

export const loadModelsFailed = createAction(
  '[Configuration] Load Models Failed',
  props<{ error: any }>()
);

export const addModel = createAction(
  '[Configuration] Add Model',
  props<{ model: Model }>()
);

export const addModelSuccess = createAction(
  '[Configuration] Add Model Success',
  props<{ model: Model }>()
);

export const addModelFailed = createAction(
  '[Configuration] Add Model Failed',
  props<{ error: any }>()
);

export const deleteModel = createAction(
  '[Configuration] Delete Model'
);

export const deleteModelSuccess = createAction(
  '[Configuration] Delete Model Success',
  props<{ id: number }>()
);

export const deleteModelFailed = createAction(
  '[Configuration] Delete Model Failed',
  props<{ error: any }>()
);
