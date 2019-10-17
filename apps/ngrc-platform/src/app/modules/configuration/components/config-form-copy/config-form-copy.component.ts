import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-config-form-copy',
  templateUrl: './config-form-copy.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigFormCopyComponent {
  @Input() form;
  ports = [0, 1, 2, 3, 4];
}
