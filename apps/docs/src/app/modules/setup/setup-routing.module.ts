import { Route, RouterModule } from '@angular/router';
import { SetupComponent } from './components/setup/setup.component';
import { NgModule } from '@angular/core';
import { ArduinoComponent } from './components/arduino/arduino.component';
import { RaspberrypiComponent } from './components/raspberrypi/raspberrypi.component';

const routes: Route[] = [
  { path: '', component: SetupComponent, children: [
    { path: 'raspberrypi', component: RaspberrypiComponent },
    { path: 'arduino', component: ArduinoComponent },
    { path: '**', redirectTo: 'arduino' }
  ] }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SetupRoutingModule {}
