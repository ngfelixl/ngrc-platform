import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { components } from './components';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    components
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    ConfigurationRoutingModule
  ]
})
export class ConfigurationModule { }
