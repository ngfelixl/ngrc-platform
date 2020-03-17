import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DevelopmentComponent } from './components/development/development.component';
import { SetupComponent } from './components/setup/setup.component';
import { DevicesComponent } from './components/devices/devices.component';
import { SoftwareComponent } from './components/software/software.component';
import { ArduinoComponent } from './components/arduino/arduino.component';

const routes: Route[] = [
  { path: '', component: DevelopmentComponent, children: [
    { path: 'devices', component: DevicesComponent },
    { path: 'arduino', component: ArduinoComponent },
    { path: 'setup', component: SetupComponent },
    { path: 'software', component: SoftwareComponent },
    { path: '**', redirectTo: 'setup' }
  ] }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class DevelopmentRoutingModule {}
