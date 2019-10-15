import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

import { Store, select } from '@ngrx/store';

import * as fromRoot from '../../../+store';
import * as fromFeature from '../+store';
import { Observable ,  Subscription } from 'rxjs';
import { Device } from '../models/device';
import { SocketService } from '../../../services/socket.service';
import { map } from 'rxjs/operators';
import { Controller } from '../models/controller';

@Component({
  template: `
  <mat-card>
    <mat-card-content>
      <!--<app-analog-stick-visualization [data]="(dsData$ | async).left" xlabel="x Axis" ylabel="y Axis"></app-analog-stick-visualization>
      <app-analog-stick-visualization [data]="(dsData$ | async).right"></app-analog-stick-visualization>-->
      <app-ds-visualization [data]="dsData$ | async"></app-ds-visualization>
    </mat-card-content>
    <mat-card-actions>
      <button mat-raised-button color="accent" (click)="back()">Back</button>
    </mat-card-actions>
  </mat-card>
  `,
  styles: [
    `
    mat-card-content { display: flex; justify-content: space-between; }
    app-analog-stick-visualization { flex: 1; padding: 8px; max-width: 196px; }`
  ]
})
export class DualshockComponent implements OnInit, OnDestroy {
  dsData$: Observable<Controller>;

  constructor(
    private location: Location,
    private store: Store<fromFeature.State>
  ) {}

  ngOnInit() {
    this.store.dispatch(new fromFeature.DsAddListener('left'));
    this.store.dispatch(new fromFeature.DsAddListener('right'));

    this.store.dispatch(new fromFeature.DsAddListener('r2'));
    this.store.dispatch(new fromFeature.DsAddListener('l2'));

    this.store.dispatch(new fromFeature.DsAddListener('x'));
    this.store.dispatch(new fromFeature.DsAddListener('circle'));
    this.store.dispatch(new fromFeature.DsAddListener('triangle'));
    this.store.dispatch(new fromFeature.DsAddListener('square'));

    this.store.dispatch(new fromFeature.DsAddListener('dpadup'));
    this.store.dispatch(new fromFeature.DsAddListener('dpaddown'));
    this.store.dispatch(new fromFeature.DsAddListener('dpadleft'));
    this.store.dispatch(new fromFeature.DsAddListener('dpadright'));
    this.store.dispatch(new fromFeature.DsAddListener('r1'));
    this.store.dispatch(new fromFeature.DsAddListener('l1'));
    this.dsData$ = this.store.select(fromFeature.getDsData);
  }

  ngOnDestroy() {
    this.store.dispatch(new fromFeature.DsRemoveListener('left'));
    this.store.dispatch(new fromFeature.DsRemoveListener('right'));
    this.store.dispatch(new fromFeature.DsRemoveListener('r2'));
    this.store.dispatch(new fromFeature.DsRemoveListener('l2'));
    this.store.dispatch(new fromFeature.DsRemoveListener('x'));
    this.store.dispatch(new fromFeature.DsRemoveListener('circle'));
    this.store.dispatch(new fromFeature.DsRemoveListener('triangle'));
    this.store.dispatch(new fromFeature.DsRemoveListener('square'));
    this.store.dispatch(new fromFeature.DsRemoveListener('dpadup'));
    this.store.dispatch(new fromFeature.DsRemoveListener('dpaddown'));
    this.store.dispatch(new fromFeature.DsRemoveListener('dpadleft'));
    this.store.dispatch(new fromFeature.DsRemoveListener('dpadright'));
    this.store.dispatch(new fromFeature.DsRemoveListener('r1'));
    this.store.dispatch(new fromFeature.DsRemoveListener('l1'));
  }

  back() { this.location.back(); }
}
