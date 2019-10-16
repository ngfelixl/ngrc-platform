import { Action } from '@ngrx/store';
import { Mapping } from '../../models/mapping';

export enum MappingsActionTypes {
  Load = '[Configuration] Mappings Load',
  LoadSuccess = '[Configuration] Mappings Load Success',
  LoadFailed = '[Configuration] Mappings Load Failed',

  Add = '[Configuration] Mapping Add',
  AddSuccess = '[Configuration] Mapping Add Success',
  AddFailed = '[Configuration] Mapping Add Failed',

  Delete = '[Configuration] Mapping Delete',
  DeleteSuccess = '[Configuration] Mapping Delete Success',
  DeleteFailed = '[Configuration] Mapping Delete Failed',

  Update = '[Configuration] Mapping Update',
  UpdateSuccess = '[Configuration] Mapping Update Success',
  UpdateFailed = '[Configuration] Mapping Update Failed',

  SelectMapping = '[Configuration] Select Mapping',
  ClearMapping = '[Configuration] Clear Mapping'
}


export class LoadMappings implements Action {
  readonly type = MappingsActionTypes.Load;
}

export class LoadMappingsSuccess implements Action {
  readonly type = MappingsActionTypes.LoadSuccess;
  constructor(public payload: Mapping[]) {}
}

export class LoadMappingsFailed implements Action {
  readonly type = MappingsActionTypes.LoadFailed;
  constructor(public payload: any) {}
}

export class AddMapping implements Action {
  readonly type = MappingsActionTypes.Add;
  constructor(public payload: Mapping) {}
}

export class AddMappingSuccess implements Action {
  readonly type = MappingsActionTypes.AddSuccess;
  constructor(public payload: Mapping) {}
}

export class AddMappingFailed implements Action {
  readonly type = MappingsActionTypes.AddFailed;
  constructor(public payload: any) {}
}

export class DeleteMapping implements Action {
  readonly type = MappingsActionTypes.Delete;
  constructor(public payload: string) {}
}

export class DeleteMappingSuccess implements Action {
  readonly type = MappingsActionTypes.DeleteSuccess;
}

export class DeleteMappingFailed implements Action {
  readonly type = MappingsActionTypes.DeleteFailed;
  constructor(public payload: any) {}
}

export class SelectMapping implements Action {
  readonly type = MappingsActionTypes.SelectMapping;
  constructor(public payload: Mapping) {}
}

export class ClearMapping implements Action {
  readonly type = MappingsActionTypes.ClearMapping;
}

export class UpdateMapping implements Action {
  readonly type = MappingsActionTypes.Update;
  constructor(public payload: Mapping) {}
}

export class UpdateMappingSuccess implements Action {
  readonly type = MappingsActionTypes.UpdateSuccess;
  constructor(public payload: Mapping) {}
}

export class UpdateMappingFailed implements Action {
  readonly type = MappingsActionTypes.UpdateFailed;
  constructor(public payload: any) {}
}

export type MappingsActions =
  LoadMappings |
  LoadMappingsSuccess |
  LoadMappingsFailed |
  AddMapping |
  AddMappingSuccess |
  AddMappingFailed |
  DeleteMapping |
  DeleteMappingSuccess |
  DeleteMappingFailed |
  UpdateMapping |
  UpdateMappingSuccess |
  UpdateMappingFailed |
  SelectMapping |
  ClearMapping;
