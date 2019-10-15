import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromDevices from '../../+store';
import { Observable } from 'rxjs';
import { Device } from '../../models/device';
import { NrfState } from '../../models/nrf-state';

@Component({
  templateUrl: './devices.component.html',
  styleUrls: [ './devices.component.css' ]
})
export class DevicesComponent {
  dualshock$: Observable<Device>;
  nrf$: Observable<NrfState>;

  constructor(private store: Store<fromDevices.State>) {
    this.dualshock$ = this.store.select(fromDevices.getDualshock);
    this.nrf$ = this.store.select(fromDevices.getNrfState);
  }
}
