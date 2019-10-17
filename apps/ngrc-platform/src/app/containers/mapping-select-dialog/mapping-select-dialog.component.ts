import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromConfiguration from '../../modules/configuration/+store';
import { Model, Mapping } from '../../modules/configuration/models';
import { Observable, Subscription } from 'rxjs';
import { loadMappings, selectMapping, loadModels } from '../../modules/configuration/+store';

@Component({
  templateUrl: './mapping-select-dialog.component.html',
  styles: [`mat-form-field { width: 100%; }`]
})
export class MappingSelectDialogComponent implements OnInit, OnDestroy {
  title = '';
  models$: Observable<Model[]>;
  mappings: Mapping[];
  mapping$: Observable<Mapping>;
  subscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<MappingSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<fromConfiguration.State>
  ) {}

  ngOnInit() {
    this.store.dispatch(loadModels());
    this.store.dispatch(loadMappings());
    this.models$ = this.store.select(fromConfiguration.selectAllModels);
    this.mapping$ = this.store.select(fromConfiguration.getSelectedMapping);
    this.subscription = this.store.select(fromConfiguration.selectAllMappings).subscribe(mappings => {
      this.mappings = mappings;
    });
  }

  select(mappingId: number) {
    const mapping = this.mappings.filter(o => o.id === mappingId)[0];
    this.store.dispatch(selectMapping({ id: mapping.id }));
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
