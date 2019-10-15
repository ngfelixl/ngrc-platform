import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Subscription ,  Observable } from 'rxjs';

import { SocketService } from '../../../../services/socket.service';
import * as fromRoot from '../../../../+store';
import * as fromConfiguration from '../../../configuration/store';
import * as fromDevices from '../../../devices/+store';
import { Controller } from '../../../devices/models/controller';
import { Mapping } from '../../../configuration/models/mapping';

@Component({
  templateUrl: './operating.component.html',
  styleUrls: [ './operating.component.css' ]
})
export class OperatingComponent implements OnDestroy {
  subscriptions: Subscription[] = [];
  dsData$: Observable<Controller>;
  data$: Observable<Uint8Array>;
  mapping: Mapping;
  subscription: Subscription;
  isLandscape$: Observable<boolean>;

  constructor(
    private socketService: SocketService,
    private store: Store<fromRoot.State>
  ) {
    this.isLandscape$ = this.store.select(fromRoot.isLandscape);
    this.subscription = this.store.select(fromConfiguration.getSelectedMapping).subscribe(mapping => {
      if (!mapping) {
        this.store.dispatch(new fromRoot.OpenMappingSelect());
      } else {
        this.mapping = mapping;
        this.store.dispatch(new fromDevices.NrfStartTransmission());
        this.store.dispatch(new fromRoot.AddListener('[Nrf] Transmit Data'));
        this.data$ = this.socketService.listen('[Nrf] Transmit Data');
        this.dsData$ = this.store.select(fromDevices.getDsData);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new fromDevices.NrfStopTransmission());
    this.store.dispatch(new fromRoot.RemoveListener('[Nrf] Transmit Data'));
  }
}
