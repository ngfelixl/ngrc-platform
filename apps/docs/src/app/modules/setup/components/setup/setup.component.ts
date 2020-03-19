import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngrc-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
  navigationNodes = [
    { label: 'Electronics', children: [
      { label: 'Raspberry Pi', path: 'raspberrypi' },
      { label: 'Arduino Nano', path: 'arduino' }
    ]}
  ]

  constructor() { }

  ngOnInit() {
  }

}
