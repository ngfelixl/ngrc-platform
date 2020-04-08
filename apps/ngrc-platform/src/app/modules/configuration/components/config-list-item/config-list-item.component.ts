import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Model } from '@ngrc/interfaces/models';

@Component({
  selector: 'ngrc-config-list-item',
  templateUrl: './config-list-item.component.html',
  styleUrls: [ './config-list-item.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigListItemComponent {
  @Input() form: FormGroup;
  @Input() model: Model;

  ports = [0, 1, 2, 3, 4];
  expanded = false;

  get title(): string { return this.form.get('title')?.value as string; }
  get type(): string { return this.form.get('type')?.value as string; }
  get copy(): FormGroup { return this.form.get('copy') as FormGroup; }
  get direct(): FormGroup { return this.form.get('direct') as FormGroup; }
  get binary(): FormGroup { return this.form.get('binary') as FormGroup; }
  get relative(): FormGroup { return this.form.get('relative') as FormGroup; }
  get button(): FormGroup { return this.form.get('button') as FormGroup; }
  get threshold(): FormGroup { return this.form.get('threshold') as FormGroup; }
}
