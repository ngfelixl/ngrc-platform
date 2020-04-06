import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Controller } from '@ngrc/interfaces/dualshock';
import { Mapping } from '@ngrc/interfaces/models';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay, filter } from 'rxjs/operators';
import { isLandscape, openMappingSelect, State } from '../../../../+store';
import { getSelectedMapping } from '../../../configuration/+store';
import { getDualshockData, getNrfBuffer, listenToDualshock, nrfStartTransmission, nrfStopTransmission,
  unlistenToDualshock, getNrfStats } from '../../../devices/+store';
import { Nrf24Stats } from '@ngrc/interfaces/nrf24';

@Component({
  templateUrl: './operating.component.html',
  styleUrls: [ './operating.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OperatingComponent implements OnDestroy {
  dsData$: Observable<Controller>;
  dsLeft$: Observable<number[]>;
  dsRight$: Observable<number[]>;
  data$: Observable<number[]>;
  subscription: Subscription;
  isLandscape$: Observable<boolean>;
  mapping$: Observable<Mapping | undefined>;
  stats$: Observable<Nrf24Stats>

  constructor(private store: Store<State>) {
    this.isLandscape$ = this.store.select(isLandscape);
    this.stats$ = this.store.select(getNrfStats);
    this.mapping$ = this.store.select(getSelectedMapping);
    this.subscription = this.mapping$.subscribe(mapping => {
      if (!mapping) {
        this.store.dispatch(openMappingSelect());
      } else {
        this.store.dispatch(nrfStartTransmission());
        this.data$ = this.store.select(getNrfBuffer);
        this.dsData$ = this.store.select(getDualshockData).pipe(shareReplay(1));
        this.dsLeft$ = this.dsData$.pipe(map(data  => [data.sticks.left.x, 255 - data.sticks.left.y]));
        this.dsRight$ = this.dsData$.pipe(map(data  => [data.sticks.right.x, 255 - data.sticks.right.y]));
      }
    });

    this.store.dispatch(listenToDualshock());
  }

  selectMapping() {
    this.store.dispatch(openMappingSelect());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(nrfStopTransmission());
    this.store.dispatch(unlistenToDualshock());
  }
}
