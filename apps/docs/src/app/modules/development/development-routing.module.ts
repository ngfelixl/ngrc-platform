import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DevelopmentComponent } from './components/development/development.component';

const routes: Route[] = [
  { path: '', component: DevelopmentComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class DevelopmentRoutingModule {}
