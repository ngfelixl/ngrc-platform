import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../../environments/environment';

import { Model } from '../models/model';
import { Mapping } from '../models/mapping';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-config-form-header',
  template: `
  <div class="container mat-elevation-z1">
    <div><img src="{{environment.api}}/images/{{model?.img}}"></div>
    <span class="mat-title">{{model?.title}} Controls</span>
    <mat-form-field>
      <mat-select #mappingSelector placeholder="Select Config" [value]="mapping?.id" (selectionChange)="select(mappingSelector.value)">
        <mat-option>New</mat-option>
        <mat-option *ngFor="let mapping of mappings" [value]="mapping.id">{{mapping.title}}</mat-option>
      </mat-select>
    </mat-form-field>
  </div>`,
  styles: [`
    .container { display: flex; flex-wrap: wrap; align-items: center; padding: 12px; }
    .container > span, :host > mat-form-field { flex: 1 1 100px; }
    .container > div { flex: 0 0 48px; margin-right: 8px; }
    img { width: 48px; height: 48px; border-radius: 18px; }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigFormHeaderComponent {
  environment = environment;
  @Input() model: Model;
  @Input() mappings: Mapping[] = [];
  @Input() mapping: Mapping;
  @Output() selectMapping = new EventEmitter<Mapping>();

  select(mappingId: string) {
    const mapping = this.mappings.filter(o => o.id === mappingId)[0];
    this.selectMapping.emit(mapping);
  }
}
