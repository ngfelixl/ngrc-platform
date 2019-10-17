import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromMappings from './mappings.reducer';
import * as fromModels from './models.reducer';

export interface State {
  mappings: fromMappings.MappingsState;
  models: fromModels.ModelsState;
}

export const reducers: ActionReducerMap<State> = {
  mappings: fromMappings.reducer,
  models: fromModels.reducer
};

export const getConfigurationState = createFeatureSelector<State>('configuration');
