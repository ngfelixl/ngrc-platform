import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { SocketService } from '../../../services/socket.service';

import * as fromRoot from '../../../+store';

// import { ToggleSidenav, CloseSidenav } from '../../core/store/actions/layout';
// import { NavigateUp, NavigateDown, NavigateSelect } from '../../core/store/actions/navigation';
// import { DsBatteryChanged, DsDataLeft, DsDataRight } from '../store/actions/devices';
// import { getSidenavItemSelected } from '../../core/store/reducers';
import { Subscription } from 'rxjs';
import { closeSidenav } from '../../../+store';

const navItems = ['/', '/controls', '/models', '/devices'];

@Injectable()
export class DualshockService {
  subscription: Subscription;

  constructor(
    private store: Store<fromRoot.State>,
    private socketService: SocketService,
    private location: Location,
    private router: Router
  ) {
    this.dsNavigationDataSubscription();
  }

  dsNavigationDataSubscription(): void {
    this.store.select(fromRoot.getSidenavItemSelected).subscribe(item => {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.subscription = this.socketService.listen('[Devices] Dualshock X').subscribe(() => {
        this.router.navigate([navItems[item]]);
        this.store.dispatch(closeSidenav());
      });
    });
  }
}
