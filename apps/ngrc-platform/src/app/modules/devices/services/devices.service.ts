import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { SocketService } from '../../../services/socket.service';

import * as fromDevices from '../+store';
import { dualshockOnline, dualshockOffline } from '../+store';

@Injectable()
export class DevicesService {
  constructor(
    private socketService: SocketService,
    private store: Store<fromDevices.State>
  ) {
    this.socketService.listen('[Devices] Dualshock connected').subscribe(data => {
      this.store.dispatch(dualshockOnline());
    });
    this.socketService.listen('[Devices] Dualshock disconnected').subscribe(data => {
      this.store.dispatch(dualshockOffline());
    });
  }
}
