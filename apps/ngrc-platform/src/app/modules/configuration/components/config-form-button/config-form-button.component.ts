import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-config-form-button',
  templateUrl: './config-form-button.component.html',
  styleUrls: [ './config-form-button.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigFormButtonComponent {
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
