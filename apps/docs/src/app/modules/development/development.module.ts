import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevelopmentRoutingModule } from './development-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ComponentsModule } from '../components/components.module';
import { components } from './components';

@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    DevelopmentRoutingModule,
    MatSidenavModule,
    ComponentsModule
  ]
})
export class DevelopmentModule { }
