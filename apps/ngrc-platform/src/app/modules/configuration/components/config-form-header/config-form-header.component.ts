import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Mapping, Model } from '@ngrc/interfaces/models';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'ngrc-config-form-header',
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
