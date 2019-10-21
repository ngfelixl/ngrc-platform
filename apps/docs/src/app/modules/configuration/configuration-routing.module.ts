import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConfigurationComponent } from './components/configuration/configuration.component';

const routes: Route[] = [
  { path: '', component: ConfigurationComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ConfigurationRoutingModule {}
