import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { Controller } from '@ngrc/dualshock-shared';
import { getDualshockData, State } from '../../+store';

@Component({
  templateUrl: './dualshock.component.html',
  styles: [`
    mat-card-content { display: flex; justify-content: space-between; }
    ngrc-analog-stick-visualization { flex: 1; padding: 8px; max-width: 196px; }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DualshockComponent implements OnInit {
  dsData$: Observable<Controller>;

  constructor(
    private location: Location,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.dsData$ = this.store.select(getDualshockData);
  }

  back() { this.location.back(); }
}
