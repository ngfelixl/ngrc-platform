import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-config-form-button',
  template: `
  <div class="form" [formGroup]="form">
    <div formGroupName="decrease">
      <b>Decrease</b>
      <div class="formfields">
        <mat-form-field>
          <mat-select formControlName="controller" placeholder="Button">
            <mat-option *ngFor="let button of buttons" [value]="button.id">{{button.title}}</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field>
          <input matInput formControlName="variation" placeholder="Variation">
          <span matSuffix>[1/s]</span>
        </mat-form-field>
      </div>
    </div>
    <div formGroupName="increase">
      <b>Increase</b>
      <div class="formfields">
        <mat-form-field>
          <mat-select formControlName="controller" placeholder="Button">
            <mat-option *ngFor="let button of buttons" [value]="button.id">{{button.title}}</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field>
          <input matInput formControlName="variation" placeholder="Variation">
          <span matSuffix>[1/s]</span>
        </mat-form-field>
        </div>
    </div>
  </div>
  `,
  styles: [
    `.form { display: flex; flex-wrap: wrap; padding: -5px; }
    .form > * { flex: 1 1 150px; margin: 5px; }
    mat-form-field { width: 100%; }
    .formfields { display: flex; flex-wrap: wrap; }
    .formfields > * { flex: 1 1 100px; }`
  ],
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
