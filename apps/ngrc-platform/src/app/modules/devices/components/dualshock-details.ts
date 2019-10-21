import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Device } from '../models/device';

@Component({
  selector: 'ngrc-dualshock-details',
  template: `
    <p>
      Connection: {{device.online ? 'Connected' : 'Disconnected'}}
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DualshockDetailsComponent {
  @Input() device: Device;
}
