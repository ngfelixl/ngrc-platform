import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../../+store';
import * as fromFeature from '../reducers';
import * as fromMappings from '../reducers/mappings.reducer';

import { Mapping } from '@ngrc/interfaces/models';

export const getMappingsState = createSelector(
  fromFeature.getConfigurationState,
  (configuration) => configuration.mappings
);

export const getSelectedMappingId = createSelector(
  getMappingsState,
  (mappings) => mappings.selectedMapping
);

export const {
  selectEntities: selectMappingsEntities,
  selectAll: selectAllMappings
} = fromMappings.adapter.getSelectors(getMappingsState);

export const getSelectedMapping = createSelector(
  getSelectedMappingId,
  selectMappingsEntities,
  (id, mappings) => mappings[id]
);

export const getMappings = createSelector(
  selectAllMappings,
  fromRoot.getRouterState,
  (mappings, router): Mapping[] => {
    return router.state && mappings.filter(o => o.modelId === +router.state.params.id); // [router.state.params.id];
  }
);
