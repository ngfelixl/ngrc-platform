import { Component, OnInit } from '@angular/core';
import { Mapping, Model } from '@ngrc/interfaces/models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { addMapping, clearMapping, deleteMapping, deleteModel, getMappings, getSelectedMapping, getSelectedModel, loadMappings, loadModels, selectMapping, State, updateMapping } from '../../+store';
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
