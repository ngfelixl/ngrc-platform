import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngrc-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  navigationNodes = [
    { path: 'devices', label: 'Devices' },
    { path: 'model', label: 'Model' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
