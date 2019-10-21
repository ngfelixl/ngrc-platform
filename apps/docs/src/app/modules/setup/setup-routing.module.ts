import { Route, RouterModule } from '@angular/router';
import { SetupComponent } from './components/setup/setup.component';
import { NgModule } from '@angular/core';

const routes: Route[] = [
  { path: '', component: SetupComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SetupRoutingModule {}
