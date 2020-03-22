import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { State, getDualshockState, getNrfConnected } from '../../+store';
import { Observable } from 'rxjs';
import { Device } from '../../models/device';
import { Nrf24State } from '@ngrc/interfaces/nrf24';

@Component({
  templateUrl: './devices.component.html',
  styleUrls: [ './devices.component.css' ]
})
export class DevicesComponent {
  dualshock$: Observable<Device>;
  nrf$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.dualshock$ = this.store.select(getDualshockState);
    this.nrf$ = this.store.select(getNrfConnected);
  }
}
