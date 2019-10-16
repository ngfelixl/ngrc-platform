import { createFeatureSelector, createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';

import { MappingsActions, MappingsActionTypes } from '../actions';
import { Mapping } from '../../models/mapping';
import * as fromRoot from '../../../../+store/reducers';

export const adapter: EntityAdapter<Mapping> = createEntityAdapter<Mapping>({
  selectId: mapping => mapping.id,
  sortComparer: (mappingA, mappingB) => mappingA.title.localeCompare(mappingB.title)
});

export interface State extends EntityState<Mapping> {
  selectedMapping: Mapping;
}
const initialState = adapter.getInitialState({
  selectedMapping: null
});

export function reducer(state = initialState, action: MappingsActions): State {
  switch (action.type) {

    case MappingsActionTypes.LoadSuccess:
      return adapter.addAll(action.payload, state);

    case MappingsActionTypes.AddSuccess:
      return adapter.addOne(action.payload, state);

    case MappingsActionTypes.UpdateSuccess:
      return adapter.updateOne({id: action.payload.id, changes: action.payload}, state);

    case MappingsActionTypes.SelectMapping:
      return {...state, selectedMapping: action.payload};

    case MappingsActionTypes.ClearMapping:
      return {...state, selectedMapping: null };

    case MappingsActionTypes.Delete:
      return adapter.removeOne(action.payload, state);

    default: return state;
  }
}
