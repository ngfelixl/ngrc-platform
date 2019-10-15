import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatModule } from '../mat/mat.module';
import { SharedModule } from '../shared/shared.module';
import { OperatingRoutingModule } from './operating-routing.module';

import { containers } from './containers';
import { components } from './components';


@NgModule({
  imports: [
    CommonModule,
    MatModule,
    SharedModule,
    OperatingRoutingModule
  ],
  declarations: [
    components,
    containers
  ]
})
export class OperatingModule {}
