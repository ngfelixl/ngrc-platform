import { Component } from '@angular/core';

@Component({
  selector: 'ngrc-development',
  templateUrl: './development.component.html',
  styleUrls: ['./development.component.css']
})
export class DevelopmentComponent {
  navigationNodes = [
    { label: 'Setup', children: [
      { path: 'devices', label: 'Devices' },
      { path: 'setup', label: 'Raspberry Pi' },
      { path: 'arduino', label: 'Arduino' },
      { path: 'software', label: 'Software' }
    ] }
  ];
}
