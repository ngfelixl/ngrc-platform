import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperatingComponent } from './containers/operating/operating.component';

const routes: Routes = [
  {
    path: 'operating',
    children: [
      { path: '', component: OperatingComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class OperatingRoutingModule {}
