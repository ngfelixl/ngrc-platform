import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngrc-config-form-binary',
  templateUrl: './config-form-binary.component.html',
  styleUrls: [ './config-form-binary.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigFormBinaryComponent {
  @Input() form: FormGroup;

  buttons = [
    { id: 'x', title: 'X' },
    { id: 'square', title: 'Square' },
    { id: 'circle', title: 'Circle' },
    { id: 'triangle', title: 'Triangle' },
    { id: 'r1', title: 'R1' },
    { id: 'l1', title: 'L1' }
  ];
}
