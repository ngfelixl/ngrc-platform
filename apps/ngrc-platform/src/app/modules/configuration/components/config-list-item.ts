import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Model } from '../models/model';

@Component({
  selector: 'app-config-list-item',
  template: `
    <div class="input mat-typography" [formGroup]="form">
      <div class="input-header">
        <div class="description">
          <button mat-button type="button" (click)="expanded = !expanded" color="primary">
            <mat-icon [class.collapsed]="!expanded">arrow_drop_down</mat-icon> {{title}}
          </button>
        </div>
        <div class="formfields">
          <mat-form-field>
            <mat-select formControlName="type" placeholder="Control Type">
              <mat-option value="direct">Direct</mat-option>
              <mat-option value="relative">Relative</mat-option>
              <mat-option value="threshold">Threshold</mat-option>
              <mat-option value="button">Button</mat-option>
              <mat-option value="copy">Copy</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field>
            <mat-select formControlName="port" placeholder="Servo Ports">
              <mat-option *ngFor="let port of ports" [value]="port">{{port}}</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </div>
      <div *ngIf="expanded" class="input-body">
        <div class="flex">
          <app-config-form-direct *ngIf="type === 'direct'" [form]="direct"></app-config-form-direct>
          <app-config-form-relative *ngIf="type === 'relative'" [form]="relative"></app-config-form-relative>
          <app-config-form-button *ngIf="type === 'button'" [form]="button"></app-config-form-button>
          <app-config-form-threshold *ngIf="type === 'threshold'" [form]="threshold"></app-config-form-threshold>
          <app-config-form-copy *ngIf="type === 'copy'" [form]="copy"></app-config-form-copy>
          <div class="right" formGroupName="range">
            <mat-slider #min formControlName="min" vertical thumbLabel min="0" [max]="180 - max.value" [value]="0"></mat-slider>
            <app-range-visualization [min]="min.value" [max]="max.value"></app-range-visualization>
            <mat-slider #max formControlName="max" vertical thumbLabel min="0" [max]="180 - min.value" [value]="0"></mat-slider>
          </div>
        </div>
      </div>
    </div>
    `,
  styles: [`
    :host { display: block; padding: 8px; margin: 12px 0; background-color: #fbfbfb; border-radius: 2px; }
    .input-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      background-color: #f0f0f0;
      margin: -8px;
      padding: 8px }
    .input-body { margin-top: 8px; }
    .input-header .formfields { flex: 4 4 100px; display: flex; flex-wrap: wrap; }
    .input-header .description { flex: 1 1 100px; white-space: pre-wrap; }
    mat-form-field { flex: 1 1 150px; min-width: 50px; }
    .collapsed { transform: rotate(-90deg);  }

    .flex { display: flex; flex-wrap: wrap; padding: 8px; }
    .flex > * { flex: 1 1 300px; }
    mat-form-field { width: 100%; }
    .right { display: flex; justify-content: center; align-items: center; }
    .right > mat-slider { flex: 0 0 auto; }
    .right > app-range-visualization { flex: 1; max-width: 300px; }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigListItemComponent {
  @Input() form: FormGroup;
  @Input() model: Model;

  ports = [0, 1, 2, 3, 4];
  expanded = false;

  get title(): string { return this.form.get('title').value as string; }
  get type(): string { return this.form.get('type').value as string; }
  get copy(): FormGroup { return this.form.get('copy') as FormGroup; }
  get direct(): FormGroup { return this.form.get('direct') as FormGroup; }
  get relative(): FormGroup { return this.form.get('relative') as FormGroup; }
  get button(): FormGroup { return this.form.get('button') as FormGroup; }
  get threshold(): FormGroup { return this.form.get('threshold') as FormGroup; }
}
