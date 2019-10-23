import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromConfiguration from '../../modules/configuration/+store';
import { Model, Mapping } from '../../modules/configuration/models';
import { Observable, Subscription } from 'rxjs';
import { loadMappings, selectMapping, loadModels, selectAllMappings } from '../../modules/configuration/+store';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './mapping-select-dialog.component.html',
  styles: [`
    mat-form-field { width: 100%; }
    h3 { margin: 0; }
    p { margin: 18px 0; }
  `]
})
export class MappingSelectDialogComponent implements OnInit {
  models$: Observable<Model[]>;
  mappings$: Observable<Mapping[]>;
  mapping$: Observable<Mapping>;
  subscription: Subscription;
  showSelection$: Observable<boolean>;

  constructor(
    public dialogRef: MatDialogRef<MappingSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<fromConfiguration.State>,
  ) {}

  ngOnInit() {
    this.store.dispatch(loadModels());
    this.store.dispatch(loadMappings());
    this.models$ = this.store.select(fromConfiguration.selectAllModels);
    this.mapping$ = this.store.select(fromConfiguration.getSelectedMapping);
    this.mappings$ = this.store.select(selectAllMappings);
    this.showSelection$ = this.models$.pipe(map(models => models.length > 0));
  }

  select(id: number) {
    this.store.dispatch(selectMapping({ id }));
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
