import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Model } from '@ngrc/interfaces/models';
import { addModelSuccess, deleteModelSuccess, loadModelsSuccess } from '../actions';


export const adapter: EntityAdapter<Model> = createEntityAdapter<Model>({
  selectId: model => model.id,
  sortComparer: (modelA, modelB) => modelA.id > modelB.id ? 1 : (modelA.id === modelB.id ? 0 : -1)
});

export interface ModelsState extends EntityState<Model> {}
const initialState = adapter.getInitialState();

const modelsReducer = createReducer(
  initialState,
  on(loadModelsSuccess, (state, { models }) => adapter.setAll(models, state)),
  on(deleteModelSuccess, (state, { id }) => adapter.removeOne(id, state)),
  on(addModelSuccess, (state, { model }) => adapter.addOne(model, state))
);

export function reducer(state: ModelsState = initialState, action: Action): ModelsState {
  return modelsReducer(state, action);
}
