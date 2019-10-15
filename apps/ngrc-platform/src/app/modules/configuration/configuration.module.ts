import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatModule } from '../mat/mat.module';
import { ConfigurationRoutingModule } from './configuration-routing.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';

import { StoreModule } from '@ngrx/store';
import { EffectsModule, Actions } from '@ngrx/effects';
import { reducers, effects } from './store';

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
    fromComponents.components,
    fromContainers.components,
    FilterTitlePipe
  ],
  providers: [
    fromServices.services,
    Actions
  ],
  exports: [
    fromContainers.components
  ],
  entryComponents: [
    NameDialogComponent
  ]
})
export class ConfigurationModule {}
