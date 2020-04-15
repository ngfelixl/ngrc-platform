import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ngrc-nrf24l01-details',
  template: `{{connected ? 'Connected' : 'Disconnected'}}`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Nrf24l01DetailsComponent {
  @Input() connected: boolean;
}
