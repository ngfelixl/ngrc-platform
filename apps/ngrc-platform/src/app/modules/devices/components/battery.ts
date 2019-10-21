import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngrc-battery',
  template: '{{state}}'
})
export class BatteryComponent {
  @Input() state: number;
}
