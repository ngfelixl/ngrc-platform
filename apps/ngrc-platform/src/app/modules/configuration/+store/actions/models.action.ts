import { Action } from '@ngrx/store';
import { Model } from '../../models/model';

export enum ModelsActionTypes {
  Load = '[Configuration] Models Load',
  LoadSuccess = '[Configuration] Models Load Success',
  LoadFailed = '[Configuration] Models Load Failed',

  Add = '[Configuration] Models Add',
  AddSuccess = '[Configuration] Models Add Success',
  AddFailed = '[Configuration] Models Add Failed',

  Delete = '[Configuration] Models Delete',
  DeleteSuccess = '[Configuration] Models Delete Success',
  DeleteFailed = '[Configuration] Models Delete Failed',
}

export class LoadModels implements Action {
  readonly type = ModelsActionTypes.Load;
}

export class LoadModelsSuccess implements Action {
  readonly type = ModelsActionTypes.LoadSuccess;
  constructor(public payload: Model[]) {}
}

export class LoadModelsFailed implements Action {
  readonly type = ModelsActionTypes.LoadFailed;
  constructor(public payload: any) {}
}


export class AddModel implements Action {
  readonly type = ModelsActionTypes.Add;
  constructor(public payload: Model) {}
}

export class AddModelSuccess implements Action {
  readonly type = ModelsActionTypes.AddSuccess;
  constructor(public payload: Model) {}
}

export class AddModelFailed implements Action {
  readonly type = ModelsActionTypes.AddFailed;
  constructor(public payload: any) {}
}

export class DeleteModel implements Action {
  readonly type = ModelsActionTypes.Delete;
}

export class DeleteModelSuccess implements Action {
  readonly type = ModelsActionTypes.DeleteSuccess;
  constructor(public payload: number) {}
}

export class DeleteModelFailed implements Action {
  readonly type = ModelsActionTypes.DeleteFailed;
  constructor(public payload: any) {}
}

export type ModelsActions =
  LoadModels |
  LoadModelsSuccess |
  LoadModelsFailed |
  AddModel |
  AddModelSuccess |
  AddModelFailed |
  DeleteModel |
  DeleteModelSuccess |
  DeleteModelFailed;
