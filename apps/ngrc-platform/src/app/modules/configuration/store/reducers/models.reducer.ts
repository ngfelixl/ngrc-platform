import { createFeatureSelector, createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';

import { ModelsActions, ModelsActionTypes } from '../actions';
import { Model } from '../../models/model';
import * as fromRoot from '../../../../+store/reducers';

export const adapter: EntityAdapter<Model> = createEntityAdapter<Model>({
  selectId: model => model.id,
  sortComparer: (modelA, modelB) => modelA.id > modelB.id ? 1 : (modelA.id === modelB.id ? 0 : -1)
});

export interface State extends EntityState<Model> {}
const initialState = adapter.getInitialState();

export function reducer(state = initialState, action: ModelsActions): State {
  switch (action.type) {
    case ModelsActionTypes.LoadSuccess:
      return adapter.addAll(action.payload, state);

    case ModelsActionTypes.DeleteSuccess:
      return adapter.removeOne(action.payload, state);

    case ModelsActionTypes.AddSuccess:
      return adapter.addOne(action.payload, state);

    default: return state;
  }
}
