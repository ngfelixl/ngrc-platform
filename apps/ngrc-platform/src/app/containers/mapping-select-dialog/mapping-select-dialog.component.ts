import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mapping, Model } from '@ngrc/interfaces/models';
import { Store } from '@ngrx/store';
import { merge, Observable, Subscription } from 'rxjs';
import { filter, first, map, pluck, shareReplay, tap, withLatestFrom } from 'rxjs/operators';
import { getSelectedMapping, loadMappings, loadModels, selectAllMappings, selectAllModels, selectMapping, State } from '../../modules/configuration/+store';

@Component({
  templateUrl: './mapping-select-dialog.component.html',
  styleUrls: [ './mapping-select-dialog.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MappingSelectDialogComponent implements OnInit {
  models$: Observable<Model[]>;
  mappings$: Observable<Mapping[]>;
  mapping$: Observable<Mapping | undefined>;
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
      tap(mapping => this.mappingSelectForm.patchValue(mapping || {}))
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
