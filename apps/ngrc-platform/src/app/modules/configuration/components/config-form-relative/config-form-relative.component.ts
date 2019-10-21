import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngrc-config-form-relative',
  templateUrl: './config-form-relative.component.html',
  styleUrls: [ './config-form-relative.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigFormRelativeComponent {
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
