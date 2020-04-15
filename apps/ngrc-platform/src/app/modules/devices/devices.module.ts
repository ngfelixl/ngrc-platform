import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MatModule } from '../mat/mat.module';
import { SharedModule } from '../shared/shared.module';
import { effects, reducers } from './+store';
import { components } from './components';
import { containers } from './containers';
import { DevicesRoutingModule } from './devices-routing.module';
import { DualshockService } from './services/dualshock.service';

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
