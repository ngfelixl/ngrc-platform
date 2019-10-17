import { createReducer, on, Action } from '@ngrx/store';
import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';

import { loadModelsSuccess, deleteModelSuccess, addModelSuccess } from '../actions';
import { Model } from '../../models/model';
import * as fromRoot from '../../../../+store/reducers';

export const adapter: EntityAdapter<Model> = createEntityAdapter<Model>({
  selectId: model => model.id,
  sortComparer: (modelA, modelB) => modelA.id > modelB.id ? 1 : (modelA.id === modelB.id ? 0 : -1)
});

export interface ModelsState extends EntityState<Model> {}
const initialState = adapter.getInitialState();

const modelsReducer = createReducer(
  initialState,
  on(loadModelsSuccess, (state, { models }) => adapter.addAll(models, state)),
  on(deleteModelSuccess, (state, { id }) => adapter.removeOne(id, state)),
  on(addModelSuccess, (state, { model }) => adapter.addOne(model, state))
);

export function reducer(state: ModelsState = initialState, action: Action): ModelsState {
  return modelsReducer(state, action);
}
