import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getDualshockState, getIsPVariant, getNrfConnected, State } from '../../+store';
import { Device } from '../../models/device';

@Component({
  templateUrl: './devices.component.html',
  styleUrls: [ './devices.component.css' ]
})
export class DevicesComponent {
  dualshock$: Observable<Device>;
  nrf$: Observable<boolean>;
  isP$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.dualshock$ = this.store.select(getDualshockState);
    this.nrf$ = this.store.select(getNrfConnected);
    this.isP$ = this.store.select(getIsPVariant);
  }
}
