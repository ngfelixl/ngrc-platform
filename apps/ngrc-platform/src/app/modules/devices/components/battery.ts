import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-battery',
  template: '{{state}}'
})
export class BatteryComponent {
  @Input() state: number;
}
