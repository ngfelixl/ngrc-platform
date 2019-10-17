import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-config-form-direct',
  templateUrl: './config-form-direct.component.html',
  styleUrls: [ './config-form-direct.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigFormDirectComponent {
  @Input() form: FormGroup;

  options = [
    { id: 'leftx', title: 'Left X' },
    { id: 'lefty', title: 'Left Y' },
    { id: 'rightx', title: 'Right X' },
    { id: 'righty', title: 'Right Y' },
    { id: 'r2', title: 'Right Trigger (R2)' },
    { id: 'l2', title: 'Left Trigger (L2)' }
  ];
}
