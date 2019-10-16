import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, skip, map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../+store';
import { addSocketListener } from '../../../../+store';
import { stopNrfTest, startNrfTest, setNrfConfig, getNrfConfig, State, getNrfTransmitting, getNrfState } from '../../+store';

@Component({
  templateUrl: './nrf24l01.component.html',
  styleUrls: [ './nrf24l01.component.css' ]
})
export class Nrf24l01Component implements OnInit, OnDestroy {
  nrfSettingsForm: FormGroup;
  channels = [];
  subscriptions: Subscription[] = [];
  transmitting$: Observable<boolean>;
  data$: Observable<any>;

  constructor(
    private location: Location,
    private store: Store<State>,
    private fb: FormBuilder
  ) {
    this.nrfSettingsForm = this.fb.group({
      Channel: null,
      DataRate: null,
      CRCLength: null,
      PALevel: null
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
    this.store.dispatch(getNrfConfig());
    this.subscriptions.push(this.store.select(getNrfState).subscribe(state => {
      this.nrfSettingsForm.patchValue(state);
    }));

    this.transmitting$ = this.store.select(getNrfTransmitting);

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
    this.store.dispatch(startNrfTest());
    this.store.dispatch(addSocketListener({ key: '[Nrf] Transmit Data' }));
    this.data$ = this.store.select(fromRoot.getSocketListeners).pipe(map(o => o['[Nrf] Transmit Data']));
  }

  stopTest() {
    this.store.dispatch(stopNrfTest());
  }

  back() {
    this.location.back();
  }

  ngOnDestroy() {
    this.stopTest();
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
