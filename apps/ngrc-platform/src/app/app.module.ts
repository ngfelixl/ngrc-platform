import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { containers } from './containers';
import { components } from './components';

import { AppComponent } from './containers/app/app.component';
import { ConfigurationModule } from './modules/configuration/configuration.module';
import { DevicesModule } from './modules/devices/devices.module';
import { OperatingModule } from './modules/operating/operating.module';
import { SocketService } from './services/socket.service';

import { MappingSelectDialogComponent } from './containers/mapping-select-dialog/mapping-select-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatModule } from './modules/mat/mat.module';
import { FilterMappingsByModelPipe } from './pipes/filter-mappings-by-model.pipe';
import { ReduxModule } from './+store/redux.module';

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
    ReduxModule,
    BrowserAnimationsModule,
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
