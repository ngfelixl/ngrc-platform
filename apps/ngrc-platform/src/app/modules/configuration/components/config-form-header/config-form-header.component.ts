import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../../../environments/environment';

import { Model } from '../../models/model';
import { Mapping } from '../../models/mapping';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-config-form-header',
  templateUrl: './config-form-header.component.html',
  styleUrls: [ './config-form-header.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigFormHeaderComponent {
  environment = environment;
  @Input() model: Model;
  @Input() mappings: Mapping[] = [];
  @Input() mapping: Mapping;
  @Output() selectMapping = new EventEmitter<number>();

  select(mappingId: number) {
    this.selectMapping.emit(mappingId);
  }
}
