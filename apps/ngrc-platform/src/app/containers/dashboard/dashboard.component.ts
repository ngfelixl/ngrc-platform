import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as fromRoot from '../../+store';

@Component({
  templateUrl: './dashboard.component.html',
  styles: [
    `img { width: 100px; }`
  ]
})
export class DashboardComponent {
  socket$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.socket$ = this.store.pipe(select(fromRoot.getSocketConnected));
  }
}
