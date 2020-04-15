import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Device } from '../models/device';

@Component({
  selector: 'ngrc-dualshock-details',
  template: `{{device.connected ? 'Connected' : 'Disconnected'}}`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DualshockDetailsComponent {
  @Input() device: Device;
}
