import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { SocketService } from '../services/socket.service';

import * as fromFeature from '../+store';
import * as fromConfiguration from '../modules/configuration/store';
import * as fromDevices from '../modules/devices/+store';
import { MatDialog } from '@angular/material';

import { MappingSelectDialogComponent } from './mapping-select-dialog';
import { Mapping } from '../modules/configuration/models';

@Component({
  selector: 'app-root',
  template: `
    <mat-sidenav-container fullscreen (backdropClick)="closeSidenav()">
      <mat-sidenav [opened]="showSidenav$ | async" mode="over">
        <mat-nav-list>
        <app-nav-item
          (navigate)="closeSidenav()"
          routerLink="/"
          icon="assessment"
          hint="State overview"
          [selected]="(selected$ | async) === 0">
          Dashboard
        </app-nav-item>
        <app-nav-item
          (navigate)="closeSidenav()"
          routerLink="/operating"
          icon="games"
          hint="Control your device"
          [selected]="(selected$ | async) === 1">
          Control
        </app-nav-item>
        <app-nav-item
          (navigate)="closeSidenav()"
          routerLink="/models"
          icon="flight"
          hint="Select a model, map input"
          [selected]="(selected$ | async) === 2">
          Models
        </app-nav-item>
        <app-nav-item
          (navigate)="closeSidenav()"
          routerLink="/devices"
          icon="settings_input_hdmi"
          hint="Check devices states"
          [selected]="(selected$ | async) === 3">
          Devices
        </app-nav-item>
        <app-nav-item
          (navigate)="closeSidenav()"
          routerLink="/ai"
          icon="device_hub"
          hint="Learn with Tensorflow"
          [selected]="(selected$ | async) === 3">
          Machine Learning
        </app-nav-item>
        </mat-nav-list>
      </mat-sidenav>
      <div class="main" [class.landscape]="isLandscape$ | async">
        <app-toolbar
          (openSidenav)="openSidenav()"
          [isLandscape]="isLandscape$ | async"
          [transmitting]="transmitting$ | async"
          (openMappingSelect)="openMappingSelect()"
          [mapping]="(mapping$ | async)?.title"></app-toolbar>
        <div class="content"><router-outlet></router-outlet></div>
      </div>
    </mat-sidenav-container>
  `,
  styles: [
    `
    .main { height: 100%; display: flex; flex-direction: column; }
    .main.landscape { flex-direction: row; }
    app-toolbar { flex: 0 0 auto; z-index: 1; }
    .content { flex: 1; overflow-y: auto; padding: 8px; }
    `
  ]
})
export class AppComponent implements OnInit {
  isLandscape: boolean;
  showSidenav$: Observable<boolean>;
  selected$: Observable<number>;
  battery: number;
  batteryIcon: string;
  mapping$: Observable<Mapping>;
  isLandscape$: Observable<boolean>;
  transmitting$: Observable<boolean>;

  @HostListener('window:orientationchange', ['$event'])
  onResize() {
    this.store.dispatch(new fromFeature.CheckOrientation());
  }

  constructor(
    private socketService: SocketService,
    private store: Store<fromFeature.State>,
    private dialog: MatDialog
  ) {}


  ngOnInit() {
    this.isLandscape$ = this.store.select(fromFeature.isLandscape);
    this.showSidenav$ = this.store.select(fromFeature.getShowSidenav);
    this.selected$ = this.store.select(fromFeature.getSidenavItemSelected);
    this.mapping$ = this.store.select(fromConfiguration.getSelectedMapping);
    this.transmitting$ = this.store.select(fromDevices.getNrfTransmitting);

    this.socketService.listen('[Dualshock] Connection Changed').subscribe(data => {
      this.store.dispatch(new fromDevices.DualshockSetConnection(data));
    });
    this.store.select(fromDevices.getNrfState).subscribe(data => console.log(data));
    this.store.dispatch(new fromDevices.GetNrfConfig());


    this.socketService.request('[Dualshock] Get Connection Success').subscribe(data => {
      this.store.dispatch(new fromDevices.DualshockSetConnection(data));
    });
    this.socketService.emit('[Dualshock] Get Connection');

    this.store.select(fromFeature.getMappingSelectDialog).subscribe(showDialog => {
      if (showDialog) { this.openDialog();
      } else { this.dialog.closeAll(); }
    });
  }

  openMappingSelect() { this.store.dispatch(new fromFeature.OpenMappingSelect()); }
  closeMappingSelect() { this.store.dispatch(new fromFeature.CloseMappingSelect()); }

  openSidenav() { this.store.dispatch(new fromFeature.OpenSidenav()); }
  closeSidenav() { this.store.dispatch(new fromFeature.CloseSidenav()); }

  openDialog(): void {
    const dialogRef = this.dialog.open(MappingSelectDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.store.dispatch(new fromFeature.CloseMappingSelect());
    });
  }

  getBatteryIcon(battery) {
    if (battery < 20) {
      this.batteryIcon = 'battery_alert';
    } else if (battery < 30) {
      this.batteryIcon = 'battery_20';
    } else if (battery < 50) {
      this.batteryIcon = 'battery_30';
    } else if (battery < 60) {
      this.batteryIcon = 'battery_50';
    } else if (battery < 80) {
      this.batteryIcon = 'battery_60';
    } else if (battery < 90) {
      this.batteryIcon = 'battery_80';
    } else if (battery < 100) {
      this.batteryIcon = 'battery_90';
    } else if (battery === 100) {
      this.batteryIcon = 'battery_full';
    }
  }
}
