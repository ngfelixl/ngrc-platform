import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-config-form-direct',
  template: `
    <div class="form" [formGroup]="form">
      <mat-form-field>
        <mat-select formControlName="controller" placeholder="Analog Input">
          <mat-option *ngFor="let option of options" [value]="option.id">{{option.title}}</mat-option>
        </mat-select>
      </mat-form-field>
      <div class="invert-checkbox">
        <mat-checkbox formControlName="invert">Invert</mat-checkbox>
      </div>
    </div>
  `,
  styles: [`
    .form { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); grid-gap: 12px; align-items: center; }
  `],
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
