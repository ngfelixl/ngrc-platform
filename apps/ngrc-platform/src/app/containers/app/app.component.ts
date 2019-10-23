import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromFeature from '../../+store';
import * as fromConfiguration from '../../modules/configuration/+store';
import * as fromDevices from '../../modules/devices/+store';
import { MatDialog } from '@angular/material';

import { MappingSelectDialogComponent } from '../mapping-select-dialog/mapping-select-dialog.component';
import { Mapping } from '../../modules/configuration/models';
import { getNrfConfig } from '../../modules/devices/+store';
import { closeMappingSelect, closeSidenav, openSidenav, openMappingSelect, checkOrientation } from '../../+store';

@Component({
  selector: 'ngrc-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
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

  @HostListener('window:orientationchange')
  onResize() {
    this.store.dispatch(checkOrientation());
  }

  constructor(
    private store: Store<fromFeature.State>,
    private dialog: MatDialog
  ) {}


  ngOnInit() {
    this.isLandscape$ = this.store.select(fromFeature.isLandscape);
    this.showSidenav$ = this.store.select(fromFeature.getShowSidenav);
    this.selected$ = this.store.select(fromFeature.getSidenavItemSelected);
    this.mapping$ = this.store.select(fromConfiguration.getSelectedMapping);
    this.transmitting$ = this.store.select(fromDevices.getNrfTransmitting);

    this.store.dispatch(getNrfConfig());

    this.store.select(fromFeature.getMappingSelectDialog).subscribe(showDialog => {
      if (showDialog) {
        this.openDialog();
      } else {
        this.dialog.closeAll();
      }
    });
  }

  openMappingSelect() { this.store.dispatch(openMappingSelect()); }
  closeMappingSelect() { this.store.dispatch(closeMappingSelect()); }

  openSidenav() { this.store.dispatch(openSidenav()); }
  closeSidenav() { this.store.dispatch(closeSidenav()); }

  openDialog(): void {
    const dialogRef = this.dialog.open(MappingSelectDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.store.dispatch(closeMappingSelect());
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
