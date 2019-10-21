import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'setup', loadChildren: () => import('./modules/setup/setup.module').then(m => m.SetupModule) },
  { path: 'configuration', loadChildren: () => import('./modules/configuration/configuration.module').then(m => m.ConfigurationModule) },
  { path: 'development', loadChildren: () => import('./modules/development/development.module').then(m => m.DevelopmentModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
