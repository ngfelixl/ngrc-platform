import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { containers } from './containers';
import { components } from './components';

import { AppComponent } from './containers/app';
import { ConfigurationModule } from './modules/configuration/configuration.module';
import { DevicesModule } from './modules/devices/devices.module';
import { OperatingModule } from './modules/operating/operating.module';
import { SocketService } from './services/socket.service';

import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './+store';
import { MappingSelectDialogComponent } from './containers/mapping-select-dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { MatModule } from './modules/mat/mat.module';
import { FilterMappingsByModelPipe } from './pipes/filter-mappings-by-model.pipe';

@NgModule({
  declarations: [
    components,
    containers,
    FilterMappingsByModelPipe
  ],
  imports: [
    BrowserModule,
    ConfigurationModule,
    DevicesModule,
    OperatingModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    BrowserAnimationsModule,
    EffectsModule.forRoot([AppEffects]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    AppRoutingModule,
    MatModule
  ],
  providers: [SocketService],
  bootstrap: [AppComponent],
  entryComponents: [
    MappingSelectDialogComponent
  ]
})
export class AppModule { }
