import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

import { Store } from '@ngrx/store';

import * as fromFeature from '../../+store';
import { Observable } from 'rxjs';
import { Controller } from '../../models/controller';
import { dualshockRemoveAllListeners, dualshockAddAllListeners } from '../../+store';

@Component({
  templateUrl: './dualshock.component.html',
  styles: [
    `
    mat-card-content { display: flex; justify-content: space-between; }
    ngrc-analog-stick-visualization { flex: 1; padding: 8px; max-width: 196px; }`
  ]
})
export class DualshockComponent implements OnInit, OnDestroy {
  dsData$: Observable<Controller>;

  constructor(
    private location: Location,
    private store: Store<fromFeature.State>
  ) {}

  ngOnInit() {
    this.store.dispatch(dualshockAddAllListeners());
    this.dsData$ = this.store.select(fromFeature.getDsData);
  }

  ngOnDestroy() {
    this.store.dispatch(dualshockRemoveAllListeners());
  }

  back() { this.location.back(); }
}
