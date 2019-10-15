import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DevicesComponent } from './containers/devices/devices.component';
import { DualshockComponent } from './containers/dualshock';
import { Nrf24l01Component } from './containers/nrf24l01/nrf24l01.component';
import { RaspberrypiComponent } from './containers/raspberrypi';

const routes: Routes = [
  { path: 'devices', children: [
    { path: '', component: DevicesComponent },
    { path: 'dualshock', component: DualshockComponent },
    { path: 'nrf24l01', component: Nrf24l01Component },
    { path: 'raspberrypi', component: RaspberrypiComponent }
  ]}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class DevicesRoutingModule { }
