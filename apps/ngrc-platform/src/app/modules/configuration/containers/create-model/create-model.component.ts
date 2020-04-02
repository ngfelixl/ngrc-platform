import { Component } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';

import * as fromFeature from '../../+store';
import { Model } from '@ngrc/interfaces/models';
import { clearMapping, addModel } from '../../+store';

@Component({
  templateUrl: './create-model.component.html',
  styleUrls: [ './create-model.component.css' ]
})
export class CreateModelComponent {
  modelForm: FormGroup;
  preview: string;

  constructor(
    private store: Store<fromFeature.State>,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.modelForm = this.fb.group({
      title: ['', Validators.required],
      img: [null, Validators.required],
      slots: this.fb.array([this.createItem()], Validators.required)
    });
  }

  removeItem(index: number) {
    this.slots.controls.splice(index, 1);
  }

  addItem() {
    (this.modelForm.get('slots') as FormArray).push(this.createItem());
  }

  createItem() {
    return this.fb.group({
      title: ['', Validators.required]
    });
  }

  get slots(): FormArray {
    if (this.modelForm) {
      return this.modelForm.get('slots') as FormArray;
    }
  }

  back() {
    this.location.back();
  }

  save(model: Model) {
    this.store.dispatch(clearMapping());
    this.store.dispatch(addModel({ model }));
  }

  onImgChange(event) {
    // const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const file = event.target.files.item(0);
      this.modelForm.patchValue({ img: file });


      const reader = new FileReader();

      reader.onload = (e) => {
        this.preview = e.target.result.toString();
      }

      reader.readAsDataURL(event.target.files.item(0));
    }


  }
}
