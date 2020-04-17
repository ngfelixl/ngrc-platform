import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Controller } from '@ngrc/interfaces/dualshock';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getDualshockData, listenToDualshock, State, unlistenToDualshock, getDualshockConfig, loadDualshockConfig, setDualshockConfig } from '../../+store';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './dualshock.component.html',
  styleUrls: [ './dualshock.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DualshockComponent implements OnInit, OnDestroy {
  dsData$: Observable<Controller>;
  dualshockForm: FormGroup;
  subscription: Subscription;

  constructor(
    private location: Location,
    private store: Store<State>
  ) {
    this.dualshockForm = new FormGroup({
      frequency: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.dsData$ = this.store.select(getDualshockData);
    this.store.dispatch(listenToDualshock());
    this.store.dispatch(loadDualshockConfig());

    this.subscription = this.store.select(getDualshockConfig).subscribe(config => {
      this.dualshockForm.patchValue(config);
    });
  }

  ngOnDestroy() {
    this.store.dispatch(unlistenToDualshock());
    this.subscription.unsubscribe();
  }

  save() {
    this.store.dispatch(setDualshockConfig({ config: this.dualshockForm.value }));
  }

  back() { this.location.back(); }
}
