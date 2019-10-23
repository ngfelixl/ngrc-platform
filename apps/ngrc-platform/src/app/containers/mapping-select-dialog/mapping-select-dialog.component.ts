import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { Model, Mapping } from '../../modules/configuration/models';
import { Observable, Subscription, merge } from 'rxjs';
import { State, loadMappings, selectMapping, loadModels, selectAllMappings,
  selectAllModels, getSelectedMapping } from '../../modules/configuration/+store';
import { map, withLatestFrom, pluck, first, filter, shareReplay, tap, skip } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './mapping-select-dialog.component.html',
  styleUrls: [ './mapping-select-dialog.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MappingSelectDialogComponent implements OnInit {
  models$: Observable<Model[]>;
  mappings$: Observable<Mapping[]>;
  mapping$: Observable<Mapping>;
  subscription: Subscription;
  showSelection$: Observable<boolean>;
  hideMappingsSelection$: Observable<boolean>;
  mappingSelectForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MappingSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<State>,
  ) {
    this.mappingSelectForm = new FormGroup({
      modelId: new FormControl(null, Validators.required),
      id: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    const allMappings$ = this.store.select(selectAllMappings);
    this.models$ = this.store.select(selectAllModels);
    this.mapping$ = this.store.select(getSelectedMapping).pipe(
      first(),
      filter(mapping => !!mapping),
      tap(mapping => this.mappingSelectForm.patchValue(mapping))
    );
    this.mappings$ = merge(this.mappingSelectForm.valueChanges, this.mapping$).pipe(
      pluck('modelId'),
      withLatestFrom(allMappings$),
      map(([modelId, mappings]) => mappings.filter(mapping => mapping.modelId === modelId))
    );

    this.showSelection$ = this.models$.pipe(map(models => models.length > 0));
    this.hideMappingsSelection$ = this.mappings$.pipe(
      map(mappings => mappings.length === 0),
      shareReplay(1)
    );

    this.store.dispatch(loadModels());
    this.store.dispatch(loadMappings());
  }

  submit() {
    this.store.dispatch(selectMapping({ id: this.mappingSelectForm.value.id }));
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
