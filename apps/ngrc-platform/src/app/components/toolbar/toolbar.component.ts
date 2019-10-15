import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: [ `./toolbar.component.scss` ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  @Output() openSidenav = new EventEmitter();
  @Output() openMappingSelect = new EventEmitter();
  @Input() transmitting = false;
  @Input() mapping: string;
  @Input() batteryIcon = 'battery_unknown';
  @Input() isLandscape = false;
}
