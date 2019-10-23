import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { Controller } from '@ngrc/dualshock-shared';
import { dualshockUnlisten, dualshockListen, getDualshockData, State } from '../../+store';

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
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.store.dispatch(dualshockListen());
    this.dsData$ = this.store.select(getDualshockData);
  }

  ngOnDestroy() {
    this.store.dispatch(dualshockUnlisten());
  }

  back() { this.location.back(); }
}
