import { Component, ChangeDetectionStrategy, Input, Pipe, PipeTransform } from '@angular/core';
import { Slot } from '../models/slot';


@Component({
  selector: 'app-config-form-copy',
  template: `
  <div class="form" [formGroup]="form">
    <mat-form-field>
      <mat-select formControlName="port" placeholder="Copy from">
        <mat-option *ngFor="let port of ports" [value]="port">{{port}}</mat-option>
      </mat-select>
    </mat-form-field>
    <div class="invert-checkbox">
      <mat-checkbox formControlName="invert">Invert</mat-checkbox>
    </div>
  </div>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigFormCopyComponent {
  @Input() form;
  ports = [0, 1, 2, 3, 4];
}
