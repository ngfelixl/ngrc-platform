import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ngrc-nrf24l01-details',
  template: `
    <p>
      Connection: {{connected ? 'Connected' : 'Disconnected'}}
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Nrf24l01DetailsComponent {
  @Input() connected: boolean;
}
