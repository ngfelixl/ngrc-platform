import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-config-form-threshold',
  template: `
  <div class="form" [formGroup]="form">
    <div class="flex">
      <mat-form-field>
        <mat-select formControlName="controller" placeholder="Analog Input">
          <mat-option *ngFor="let option of options" [value]="option.id">{{option.title}}</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Variation" formControlName="variation">
        <span matSuffix>[1/s]</span>
      </mat-form-field>
    </div>
    <div class="flex">
      <div class="decrease">
        <b>Decrease</b>
        <mat-slider formControlName="min" min="0" max="255"></mat-slider>
      </div>
      <div class="increase">
        <b>Increase</b>
        <mat-slider formControlName="max" min="0" max="255"></mat-slider>
      </div>
    </div>
  </div>`,
  styles: [`
  .flex { display: flex; flex-wrap: wrap }
  .flex > * { flex: 1 1 150px; }
  mat-slider { width: 100%; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigFormThresholdComponent {
  @Input() form;

  options = [];
}
