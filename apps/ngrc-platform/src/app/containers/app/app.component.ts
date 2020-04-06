import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromFeature from '../../+store';
import * as fromConfiguration from '../../modules/configuration/+store';
import * as fromDevices from '../../modules/devices/+store';
import { MatDialog } from '@angular/material/dialog';

import { MappingSelectDialogComponent } from '../mapping-select-dialog/mapping-select-dialog.component';
import { Mapping } from '@ngrc/interfaces/models';
import { getNrfConfig, dualshockConnect, dualshockDisconnect, getDualshockBattery } from '../../modules/devices/+store';
import { closeMappingSelect, closeSidenav, openSidenav, openMappingSelect, checkOrientation } from '../../+store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngrc-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit, OnDestroy {
  isLandscape: boolean;
  showSidenav$: Observable<boolean>;
  selected$: Observable<number>;
  battery: number;
  batteryIcon$: Observable<string>;
  mapping$: Observable<Mapping | undefined>;
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
    // this.transmitting$ = this.store.select(fromDevices.getNrfTransmitting);

    this.batteryIcon$ = this.store.select(getDualshockBattery).pipe(
      map(battery => this.getBatteryIcon(battery))
    );
    this.store.dispatch(getNrfConfig());
    this.store.dispatch(dualshockConnect());

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
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.store.dispatch(closeMappingSelect());
    });
  }

  getBatteryIcon(battery: number) {
    if (!battery) {
      return 'battery_unknown';
    } else if (battery < 20) {
      return 'battery_alert';
    } else if (battery < 30) {
      return 'battery_20';
    } else if (battery < 50) {
      return 'battery_30';
    } else if (battery < 60) {
      return 'battery_50';
    } else if (battery < 80) {
      return 'battery_60';
    } else if (battery < 90) {
      return 'battery_80';
    } else if (battery < 100) {
      return 'battery_90';
    } else if (battery === 100) {
      return 'battery_full';
    }
    return 'battery_unknown';
  }

  ngOnDestroy() {
    this.store.dispatch(dualshockDisconnect());
  }
}
