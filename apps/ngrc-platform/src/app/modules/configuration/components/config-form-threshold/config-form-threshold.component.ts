import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-config-form-threshold',
  templateUrl: './config-form-threshold.component.html',
  styleUrls: [ './config-form-threshold.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigFormThresholdComponent {
  @Input() form;

  options = [];
}
