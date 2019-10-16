import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromConfiguration from '../../modules/configuration/store';
import { Model, Mapping } from '../../modules/configuration/models';
import { Observable, Subscription } from 'rxjs';

@Component({
  templateUrl: './mapping-select-dialog.component.html',
  styles: [
    `mat-form-field { width: 100%; }`
  ]
})
export class MappingSelectDialogComponent implements OnInit, OnDestroy {
  public title = '';
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
    this.store.dispatch(new fromConfiguration.LoadModels());
    this.store.dispatch(new fromConfiguration.LoadMappings());
    this.models$ = this.store.select(fromConfiguration.selectAllModels);
    this.mapping$ = this.store.select(fromConfiguration.getSelectedMapping);
    this.subscription = this.store.select(fromConfiguration.selectAllMappings).subscribe(mappings => {
      this.mappings = mappings;
    });
  }

  select(mappingId: string) {
    const mapping = this.mappings.filter(o => o.id === mappingId)[0];
    this.store.dispatch(new fromConfiguration.SelectMapping(mapping));
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
