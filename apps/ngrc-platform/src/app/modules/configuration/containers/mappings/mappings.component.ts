import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Model, Mapping } from '../../models';
import { Observable } from 'rxjs';
import { withLatestFrom, map } from 'rxjs/operators';
import { loadMappings, selectMapping, updateMapping, addMapping, clearMapping,
  deleteMapping, getMappings, getSelectedModel, getSelectedMapping, loadModels, deleteModel, State } from '../../+store';
import { getModelId } from '../../../../+store';

@Component({
  templateUrl: './mappings.component.html',
  styles: []
})
export class MappingsComponent implements OnInit {
  model$: Observable<Model>;
  mappings$: Observable<Mapping[]>;
  mapping$: Observable<Mapping>;

  constructor(
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadModels());
    this.store.dispatch(loadMappings());
    this.model$ = this.store.select(getSelectedModel);
    this.mappings$ = this.store.select(getMappings);
    this.mapping$ = this.store.select(getSelectedMapping).pipe(
      withLatestFrom(this.store.select(getModelId)),
      map(([mapping, modelId]) => {
        if (mapping && mapping.modelId !== modelId) {
          mapping = null;
        }
        return mapping;
      })
    );
  }

  selectMapping(id: number): void {
    this.store.dispatch(selectMapping({ id }));
  }

  save(mapping: Mapping) {
    if (mapping.id) {
      this.store.dispatch(updateMapping({id: mapping.id, changes: mapping}));
    } else {
      this.store.dispatch(addMapping({ mapping }));
    }
  }

  delete(id: number): void {
    if (id) {
      this.store.dispatch(clearMapping());
      this.store.dispatch(deleteMapping({ id }));
    } else {
      this.store.dispatch(deleteModel());
    }
  }

}
