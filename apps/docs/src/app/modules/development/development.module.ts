import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevelopmentComponent } from './components/development/development.component';
import { DevelopmentRoutingModule } from './development-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ComponentsModule } from '../components/components.module';
import { DevicesComponent } from './components/devices/devices.component';

@NgModule({
  declarations: [
    DevelopmentComponent,
    DevicesComponent
  ],
  imports: [
    CommonModule,
    DevelopmentRoutingModule,
    MatSidenavModule,
    ComponentsModule
  ]
})
export class DevelopmentModule { }
