import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  templateUrl: './raspberrypi.component.html',
  styleUrls: [ './raspberrypi.component.css' ]
})
export class RaspberrypiComponent {

  constructor(private location: Location) {}

  back() {
    this.location.back();
  }
}
