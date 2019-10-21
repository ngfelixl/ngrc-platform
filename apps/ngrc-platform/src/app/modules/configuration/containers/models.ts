import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromFeature from '../+store';

import { Model } from '../models/model';
import { loadModels } from '../+store';

@Component({
  template: `
    <button mat-raised-button color="accent" routerLink="new"><mat-icon>add</mat-icon> Add Model</button>

    <div class="models">
      <ngrc-model-card
        *ngFor="let model of models$ | async"
        [logo]="model.img"
        [routerLink]="[model.id]"
        [hint]="model.slots?.length + ' Channels'">
        {{model.title}}
      </ngrc-model-card>
    </div>
  `,
  styles: [`.models { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); grid-gap: 12px; margin: 12px 0; }`]
})
export class ModelsComponent implements OnInit {
  public models$: Observable<Model[]>;

  constructor(private store: Store<fromFeature.State>) {}

  ngOnInit() {
    this.models$ = this.store.select(fromFeature.selectAllModels);
    this.store.dispatch(loadModels());
  }
}
