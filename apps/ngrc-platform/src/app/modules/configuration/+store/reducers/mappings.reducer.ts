import { Mapping } from '@ngrc/interfaces/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { addMappingSuccess, clearMapping, deleteMapping, loadMappingsSuccess, selectMapping, updateMappingSuccess } from '../actions';


export const adapter: EntityAdapter<Mapping> = createEntityAdapter<Mapping>({
  selectId: mapping => mapping.id,
  sortComparer: (mappingA, mappingB) => mappingA.title.localeCompare(mappingB.title)
});

export interface MappingsState extends EntityState<Mapping> {
  selectedMapping: string;
}
const initialState = adapter.getInitialState({
  selectedMapping: null
});

const mappingsReducer = createReducer(
  initialState,
  on(loadMappingsSuccess, (state, { mappings }) => adapter.setAll(mappings, state)),
  on(addMappingSuccess, (state, { mapping }) => adapter.addOne(mapping, state)),
  on(updateMappingSuccess, (state, changes) => adapter.updateOne(changes, state)),
  on(selectMapping, (state, { id }) => ({...state, selectedMapping: id })),
  on(clearMapping, (state) => ({...state, selectedMapping: null})),
  on(deleteMapping, (state, { id }) => adapter.removeOne(id, state))
);

export function reducer(state: MappingsState, action: Action) {
  return mappingsReducer(state, action);
}
