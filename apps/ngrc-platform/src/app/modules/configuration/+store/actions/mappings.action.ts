import { createAction, props } from '@ngrx/store';
import { Mapping } from '../../models/mapping';


export const loadMappings = createAction(
  '[Configuration] Load Mappings'
);

export const loadMappingsSuccess = createAction(
  '[Configuration] Load Mappings Success',
  props<{ mappings: Mapping[] }>()
);

export const loadMappingsFailed = createAction(
  '[Configuration] Load Mappings Failed',
  props<{ error: any }>()
);

export const addMapping = createAction(
  '[Configuration] Add Mapping',
  props<{ mapping: Mapping }>()
);

export const addMappingSuccess = createAction(
  '[Configuration] Add Mapping Success',
  props<{ mapping: Mapping }>()
);

export const addMappingFailed = createAction(
  '[Configuration] Add Mapping Failed',
  props<{ error: any }>()
);

export const deleteMapping = createAction(
  '[Configuration] Delete Mapping',
  props<{ id: number }>()
);

export const deleteMappingSuccess = createAction(
  '[Configuration] Delete Mapping Success'
);

export const deleteMappingFailed = createAction(
  '[Configuration] Delete Mapping Error',
  props<{ error: any }>()
);

export const selectMapping = createAction(
  '[Configuration] Select Mapping',
  props<{ id: number }>()
);

export const clearMapping = createAction(
  '[Configuration] Clear Mapping'
);

export const updateMapping = createAction(
  '[Configuration] Update Mapping',
  props<{ id: number, changes: Partial<Mapping> }>()
);

export const updateMappingSuccess = createAction(
  '[Configuration] Update Mapping Success',
  props<{ id: number, changes: Partial<Mapping> }>()
);

export const updateMappingFailed = createAction(
  '[Configuration] Update Mapping Failed',
  props<{ error: any }>()
);
