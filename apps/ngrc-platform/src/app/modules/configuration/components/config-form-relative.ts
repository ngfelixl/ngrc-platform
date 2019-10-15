import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-config-form-relative',
  template: `
    <div class="form" [formGroup]="form">
      <mat-form-field>
        <mat-select formControlName="controller" placeholder="Analog Input">
          <mat-option *ngFor="let option of options" [value]="option.id">{{option.title}}</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Variation" formControlName="variation">
        <span matSuffix>[1/s]</span>
      </mat-form-field>
      <div class="slider">
        <b>Center</b>
        <mat-slider min="0" max="255"></mat-slider>
      </div>
      <div class="invert-checkbox">
        <mat-checkbox formControlName="invert">Invert</mat-checkbox>
      </div>
    </div>
  `,
  styles: [`
  .form { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); grid-gap: 12px; align-items: center }
  mat-slider { width: 100%; }`],
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
