import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './components';
import { SetupRoutingModule } from './setup-routing.module';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [components],
  imports: [
    ComponentsModule,
    CommonModule,
    SetupRoutingModule
  ]
})
export class SetupModule { }
