import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MatModule } from '../mat/mat.module';
import { SharedModule } from '../shared/shared.module';
import { DevicesRoutingModule } from './devices-routing.module';

import { DualshockService } from './services/dualshock.service';

import { containers } from './containers';
import { components } from './components';

import { reducers, effects } from './+store';


@NgModule({
  imports: [
    CommonModule,
    MatModule,
    SharedModule,
    StoreModule.forFeature('devices', reducers),
    DevicesRoutingModule,
    EffectsModule.forFeature(effects),
    ReactiveFormsModule
  ],
  declarations: [
    components,
    containers
  ],
  providers: [
    DualshockService
  ]
})
export class DevicesModule {}
