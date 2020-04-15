import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { State, getSystemReport, listenToRaspberrypi, unlistenToRaspberrypi } from '../../+store';
import { Store } from '@ngrx/store';
import { SystemReport } from '@ngrc/interfaces/raspberrypi';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './raspberrypi.component.html',
  styleUrls: [ './raspberrypi.component.css' ]
})
export class RaspberrypiComponent implements OnInit, OnDestroy {
  systemReport$: Observable<SystemReport>;

  constructor(
    private location: Location,
    private store: Store<State>
  ) {
    this.systemReport$ = this.store.select(getSystemReport);
  }

  ngOnInit() {
    this.store.dispatch(listenToRaspberrypi());
  }

  back() {
    this.location.back();
  }

  ngOnDestroy() {
    this.store.dispatch(unlistenToRaspberrypi());
  }
}
