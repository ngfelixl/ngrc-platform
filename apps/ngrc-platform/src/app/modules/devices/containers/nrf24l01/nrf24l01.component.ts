import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Nrf24Stats } from '@ngrc/interfaces/nrf24';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, skip, map } from 'rxjs/operators';
import { getNrfBuffer, getNrfState, getNrfStats, getNrfTesting, nrfStartTest, nrfStopTest,
  nrfStopTransmission, setNrfConfig, State, getIsPVariant } from '../../+store';

@Component({
  templateUrl: './nrf24l01.component.html',
  styleUrls: [ './nrf24l01.component.css' ]
})
export class Nrf24l01Component implements OnInit, OnDestroy {
  nrfSettingsForm: FormGroup;
  channels: number[] = [];
  subscriptions: Subscription[] = [];
  testing$: Observable<boolean>;
  stats$: Observable<Nrf24Stats>;
  buffer$: Observable<number[]>;
  isPImage$: Observable<string>;

  constructor(
    private location: Location,
    private store: Store<State>
  ) {
    this.nrfSettingsForm = new FormGroup({
      Channel: new FormControl(null),
      DataRate: new FormControl(null),
      CRCLength: new FormControl(null),
      PALevel: new FormControl(null)
    });
    for (let i = 0; i < 125; i++) {
      this.channels.push(i);
    }
  }

  get channel(): FormControl { return this.nrfSettingsForm.get('Channel') as FormControl; }
  get dataRate(): FormControl { return this.nrfSettingsForm.get('DataRate') as FormControl; }
  get crcLength(): FormControl { return this.nrfSettingsForm.get('CRCLength') as FormControl; }
  get paLevel(): FormControl { return this.nrfSettingsForm.get('PALevel') as FormControl; }

  ngOnInit() {
    this.stats$ = this.store.select(getNrfStats);
    this.testing$ = this.store.select(getNrfTesting);
    this.buffer$ = this.store.select(getNrfBuffer);
    this.isPImage$ = this.store.select(getIsPVariant).pipe(
      map((isP) => isP ? 'assets/nrf24l01p.png' : 'assets/nrf24l01.png')
    );

    this.subscriptions.push(this.store.select(getNrfState).subscribe(state => {
      this.nrfSettingsForm.patchValue(state);
    }));

    this.subscriptions.push(this.channel.valueChanges.pipe(skip(1), distinctUntilChanged()).subscribe(channel => {
      this.store.dispatch(setNrfConfig({Channel: channel}));
    }));

    this.subscriptions.push(this.dataRate.valueChanges.pipe(skip(1), distinctUntilChanged()).subscribe(dataRate => {
      this.store.dispatch(setNrfConfig({DataRate: dataRate}));
    }));

    this.subscriptions.push(this.paLevel.valueChanges.pipe(skip(1), distinctUntilChanged()).subscribe(paLevel => {
      this.store.dispatch(setNrfConfig({PALevel: paLevel}));
    }));

    this.subscriptions.push(this.crcLength.valueChanges.pipe(skip(1), distinctUntilChanged()).subscribe(crcLength => {
      this.store.dispatch(setNrfConfig({ CRCLength: crcLength }));
    }));
  }

  startTest() {
    this.store.dispatch(nrfStartTest());
  }

  stopTest() {
    this.store.dispatch(nrfStopTest());
  }

  back() {
    this.location.back();
  }

  ngOnDestroy() {
    this.store.dispatch(nrfStopTransmission());
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
