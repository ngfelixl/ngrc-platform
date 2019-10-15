import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../../+store';
import * as fromFeature from '../reducers';
import * as fromModels from '../reducers/models.reducer';

import { Model } from '../../models/model';

export const getModelsState = createSelector(
  fromFeature.getConfigurationState,
  (configuration) => configuration.models
);

export const {
  selectIds,
  selectEntities,
  selectAll: selectAllModels
} = fromModels.adapter.getSelectors(getModelsState);

export const getSelectedModel = createSelector(
  selectEntities,
  fromRoot.getRouterState,
  (entities, router): Model => {
    return router.state && entities[router.state.params.id];
  }
);
