import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getMemoryUsage, getTemperature, listenToRaspberrypi, State, unlistenToRaspberrypi } from '../../+store';

@Component({
  templateUrl: './raspberrypi.component.html',
  styleUrls: [ './raspberrypi.component.css' ]
})
export class RaspberrypiComponent implements OnInit, OnDestroy {
  temperature$: Observable<number>;
  memory$: Observable<number>;

  constructor(
    private location: Location,
    private store: Store<State>
  ) {
    this.temperature$ = this.store.select(getTemperature);
    this.memory$ = this.store.select(getMemoryUsage);
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
