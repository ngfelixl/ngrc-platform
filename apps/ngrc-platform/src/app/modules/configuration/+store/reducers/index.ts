import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromMappings from './mappings.reducer';
import * as fromModels from './models.reducer';
import { EntityState } from '@ngrx/entity';
import { Model } from '../../models/model';

export interface State {
  mappings: fromMappings.MappingsState;
  models: fromModels.State;
}

export const reducers: ActionReducerMap<State> = {
  mappings: fromMappings.reducer,
  models: fromModels.reducer
};

export const getConfigurationState = createFeatureSelector<State>('configuration');
