import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription ,  Observable } from 'rxjs';

import { SocketService } from '../../../../services/socket.service';
import { Controller } from '@ngrc/dualshock-shared';
import { Mapping } from '../../../configuration/models/mapping';
import { openMappingSelect, addSocketListener, removeSocketListener, isLandscape, State } from '../../../../+store';
import { getSelectedMapping } from '../../../configuration/+store';
import { map, share } from 'rxjs/operators';
import { nrfStopTransmission, nrfStartTransmission, getDualshockData } from '../../../devices/+store';

@Component({
  templateUrl: './operating.component.html',
  styleUrls: [ './operating.component.css' ]
})
export class OperatingComponent implements OnDestroy {
  subscriptions: Subscription[] = [];
  dsData$: Observable<Controller>;
  dsLeft$: Observable<{ x: number, y: number }>;
  dsRight$: Observable<{ x: number, y: number }>;
  data$: Observable<Uint8Array>;
  mapping: Mapping;
  subscription: Subscription;
  isLandscape$: Observable<boolean>;

  constructor(
    private socketService: SocketService,
    private store: Store<State>
  ) {
    this.isLandscape$ = this.store.select(isLandscape);
    this.subscription = this.store.select(getSelectedMapping).subscribe(mapping => {
      if (!mapping) {
        this.store.dispatch(openMappingSelect());
      } else {
        this.mapping = mapping;
        this.store.dispatch(nrfStartTransmission());
        this.store.dispatch(addSocketListener({ key: '[Nrf] Transmit Data' }));
        this.data$ = this.socketService.listen('[Nrf] Transmit Data');
        this.dsData$ = this.store.select(getDualshockData).pipe(share());
        this.dsLeft$ = this.dsData$.pipe(map(data  => data.sticks.left));
        this.dsRight$ = this.dsData$.pipe(map(data  => data.sticks.right));
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(nrfStopTransmission());
    this.store.dispatch(removeSocketListener({ key: '[Nrf] Transmit Data' }));
  }
}
