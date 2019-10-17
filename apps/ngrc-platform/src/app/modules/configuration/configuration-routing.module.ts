import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MappingsComponent } from './containers/mappings/mappings.component';
import { ModelsComponent } from './containers/models';
import { CreateModelComponent } from './containers/create-model/create-model.component';

const routes: Routes = [
  { path: 'models', children: [
    { path: '', component: ModelsComponent },
    { path: 'new', component: CreateModelComponent },
    { path: ':id', component: MappingsComponent }
  ]}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ConfigurationRoutingModule { }
