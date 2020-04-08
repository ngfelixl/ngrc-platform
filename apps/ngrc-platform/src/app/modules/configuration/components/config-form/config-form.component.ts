import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Mapping, Model } from '@ngrc/interfaces/models';
import { NameDialogComponent } from '../name-dialog';

@Component({
  selector: 'ngrc-config-form',
  templateUrl: './config-form.component.html',
  styles: [`.actions { margin-top: 8px; display: flex; justify-content: space-between; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigFormComponent implements OnChanges {
  @Output() save = new EventEmitter<Mapping>();
  @Output() delete = new EventEmitter<Mapping>();
  @Input() model: Model;
  @Input() mapping: Mapping;

  mappingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.mappingForm = this.fb.group({
      id: null,
      title: '',
      slots: this.fb.array([])
    });
  }

  ngOnChanges() {
    if (this.mapping) {
      this.mappingForm.patchValue(this.mapping);
      this.mappingForm.setControl('slots', this.fb.array(
        this.mapping.slots.map(data => {
          const slot = {
            ...data,
            range: this.fb.group(data.range || {}),
            direct: this.fb.group(data.direct || {}),
            binary: this.fb.group(data.binary || {}),
            relative: this.fb.group(data.relative || {}),
            threshold: this.fb.group(data.threshold || {}),
            button: this.fb.group(data.button || {}),
            copy: this.fb.group(data.copy || {})
          };
          return this.fb.group(slot);
        })
      ));
    }
    if (!this.mapping && this.model) {
      this.adjustRows();
    }
  }

  adjustRows() {
    this.mappingForm.reset();
    this.mappingForm.setControl('slots', this.fb.array([]));

    for (const input of this.model.slots) {
      const item = this.createItem();
      item.patchValue(input);
      this.slots.push(item);
    }
  }

  get slots(): FormArray { return this.mappingForm.get('slots') as FormArray; }
  get title(): string { return this.mappingForm.get('title')?.value as string; }

  addItem() {
    this.slots.controls.push(this.createItem());
  }

  createItem(): FormGroup {
    return this.fb.group({
      title: '',
      port: null,
      type: 'direct',
      range: this.fb.group({
        min: 0,
        max: 0
      }),
      direct: this.fb.group({
        controller: null,
        invert: false
      }),
      binary: this.fb.group({
        controller: null,
        releaseValue: 0,
        pressValue: 0
      }),
      copy: this.fb.group({
        port: null,
        invert: false,
      }),
      relative: this.fb.group({
        controller: null,
        variation: 0,
        invert: false,
        center: 128
      }),
      threshold: this.fb.group({
        controller: null,
        variation: 0,
        min: 0,
        max: 0
      }),
      button: this.fb.group({
        decrease: this.fb.group({
          controller: null,
          variation: 0
        }),
        increase: this.fb.group({
          controller: null,
          variation: 0
        })
      })
    });
  }

  back() {
    this.router.navigate(['models']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NameDialogComponent, {
      width: '250px',
      data: { name: this.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.mappingForm.patchValue({title: result});
        this.save.emit(this.mappingForm.value);
      }
    });
  }
}
