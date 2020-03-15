import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngrc-development',
  templateUrl: './development.component.html',
  styleUrls: ['./development.component.css']
})
export class DevelopmentComponent implements OnInit {
  navigationNodes = [
    { label: 'Setup', children: [
      { path: 'devices', label: 'Devices' },
      { path: 'setup', label: 'Raspberry Pi' }
    ] }
  ];
  constructor() { }

  ngOnInit() {
  }

}
