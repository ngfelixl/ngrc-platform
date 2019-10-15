import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Device } from '../models/device';

@Component({
  selector: 'app-nrf24l01-details',
  template: `
    <p>
      Connection: {{device ? 'Connected' : 'Disconnected'}}
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Nrf24l01DetailsComponent {
  @Input() device: boolean;
}
