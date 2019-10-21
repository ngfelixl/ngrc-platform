import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Device } from '../../models/device';

@Component({
  selector: 'ngrc-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: [ './device-card.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceCardComponent {
  @Input() device: Device | boolean;
  @Input() identifier = '';
}
