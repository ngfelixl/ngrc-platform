import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromFeature from '../../+store';

import { Model } from '../../models/model';
import { loadModels } from '../../+store';

@Component({
  selector: 'ngrc-models',
  templateUrl: './models.component.html',
  styleUrls: [ './models.component.css' ]
})
export class ModelsComponent implements OnInit {
  public models$: Observable<Model[]>;

  constructor(private store: Store<fromFeature.State>) {}

  ngOnInit() {
    this.models$ = this.store.select(fromFeature.selectAllModels);
    this.store.dispatch(loadModels());
  }
}
