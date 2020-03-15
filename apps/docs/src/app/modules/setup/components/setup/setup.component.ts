import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngrc-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
  navigationNodes = [
    { path: 'electronics', label: 'Electronics' }
  ]

  constructor() { }

  ngOnInit() {
  }

}
