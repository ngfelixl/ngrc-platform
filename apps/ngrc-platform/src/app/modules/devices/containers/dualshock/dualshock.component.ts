import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Controller } from '@ngrc/interfaces/dualshock';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getDualshockData, listenToDualshock, State, unlistenToDualshock } from '../../+store';

@Component({
  templateUrl: './dualshock.component.html',
  styleUrls: [ './dualshock.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DualshockComponent implements OnInit, OnDestroy {
  dsData$: Observable<Controller>;

  constructor(
    private location: Location,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.dsData$ = this.store.select(getDualshockData);
    this.store.dispatch(listenToDualshock());
  }

  ngOnDestroy() {
    this.store.dispatch(unlistenToDualshock())
  }

  back() { this.location.back(); }
}
