import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './components';
import { SetupRoutingModule } from './setup-routing.module';



@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    SetupRoutingModule
  ]
})
export class SetupModule { }
