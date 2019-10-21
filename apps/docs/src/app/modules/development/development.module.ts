import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevelopmentComponent } from './components/development/development.component';
import { DevelopmentRoutingModule } from './development-routing.module';

@NgModule({
  declarations: [DevelopmentComponent],
  imports: [
    CommonModule,
    DevelopmentRoutingModule
  ]
})
export class DevelopmentModule { }
