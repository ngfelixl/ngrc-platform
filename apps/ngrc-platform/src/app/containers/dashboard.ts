import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as fromRoot from '../+store';

@Component({
  template: `
    <mat-card>
      <mat-card-content>
        <img src="assets/icon-196.png">
        <p>Socket: {{(socket$ | async) ? 'Connected' : 'Disconnected'}}</p>
      </mat-card-content>
    </mat-card>
    `,
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
