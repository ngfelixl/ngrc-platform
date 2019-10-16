import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../+store';
import * as fromFeature from '../+store';
import { Model, Mapping } from '../models';
import { Observable, of } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';

@Component({
  template: `
      <app-config-form-header
        [model]="model$ | async"
        [mappings]="mappings$ | async"
        [mapping]="mapping$ | async"
        (selectMapping)="selectMapping($event)">
      </app-config-form-header>
      <app-config-form
        [model]="model$ | async"
        [mapping]="mapping$ | async"
        (save)="save($event)"
        (delete)="delete($event)">
      </app-config-form>`,
  styles: [
    ``
  ]
})
export class MappingsComponent implements OnInit {
  model$: Observable<Model>;
  mappings$: Observable<Mapping[]>;
  mapping$: Observable<Mapping>;

  constructor(
    private store: Store<fromFeature.State>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new fromFeature.LoadModels());
    this.store.dispatch(new fromFeature.LoadMappings());
    this.model$ = this.store.select(fromFeature.getSelectedModel);
    this.mappings$ = this.store.select(fromFeature.getMappings);
    this.mapping$ = this.store.select(fromFeature.getSelectedMapping).pipe(
      withLatestFrom(this.store.select(fromRoot.getModelId)),
      switchMap(([mapping, modelId]) => {
        if (mapping && mapping.model_id !== modelId) {
          mapping = null;
        }
        return of(mapping);
      })
    );
  }

  selectMapping(mapping: Mapping): void {
    this.store.dispatch(new fromFeature.SelectMapping(mapping));
  }

  save(mapping: Mapping) {
    if (mapping.id) {
      this.store.dispatch(new fromFeature.UpdateMapping(mapping));
    } else {
      this.store.dispatch(new fromFeature.AddMapping(mapping));
    }
  }

  delete(mappingId: string): void {
    if (mappingId) {
      this.store.dispatch(new fromFeature.ClearMapping());
      this.store.dispatch(new fromFeature.DeleteMapping(mappingId));
    } else {
      this.store.dispatch(new fromFeature.DeleteModel());
    }
  }

}
