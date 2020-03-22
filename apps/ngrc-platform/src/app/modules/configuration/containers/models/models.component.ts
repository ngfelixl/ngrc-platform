import { Component, OnInit } from '@angular/core';
import { Model } from '@ngrc/interfaces/models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromFeature from '../../+store';
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
