import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatModule } from '../mat/mat.module';
import { ConfigurationRoutingModule } from './configuration-routing.module';

import { containers } from './containers';
import { components } from './components';
import { services } from './services';

import { StoreModule } from '@ngrx/store';
import { EffectsModule, Actions } from '@ngrx/effects';
import { reducers, effects } from './+store';

import { NameDialogComponent } from './components/name-dialog';
import { FilterTitlePipe } from './pipes/filterTitle';

@NgModule({
  imports: [
    CommonModule,
    MatModule,
    ConfigurationRoutingModule,
    EffectsModule.forFeature(effects),
    StoreModule.forFeature('configuration', reducers),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    components,
    containers,
    FilterTitlePipe
  ],
  providers: [
    services,
    Actions
  ],
  exports: [
    components
  ],
  entryComponents: [
    NameDialogComponent
  ]
})
export class ConfigurationModule {}
