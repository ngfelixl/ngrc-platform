import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../+store/reducers';
import { Observable } from 'rxjs';
import { Device } from '../models/device';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  template: `
  <mat-card>
    <div class="flex">
      <div class="logo">
        <img [src]="'assets/raspberrypi.jpg'">
      </div>
      <div class="text">
        <mat-card-title>Raspberry Pi Zero W</mat-card-title>
      </div>
    </div>

    <mat-card-content>
    </mat-card-content>
    <mat-card-actions>
      <button mat-raised-button color="accent" (click)="back()">Back</button>
    </mat-card-actions>
  </mat-card>
  `,
  styles: [
    `.flex { display: flex }
    .logo { flex: 1; padding: 0 8px 0 0; }
    .text { flex: 3 }
    img { width: 100%; }`
  ]
})
export class RaspberrypiComponent {

  constructor(
    private location: Location,
    private store: Store<fromRoot.State>
  ) {
  }

  back() {
    this.location.back();
  }
}
