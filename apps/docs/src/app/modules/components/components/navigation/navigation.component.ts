import { Component, OnInit, Input } from '@angular/core';

interface NavigationNode {
  label: string;
  path: string;
  hide?: boolean;
  children?: NavigationNode[];
}

@Component({
  selector: 'ngrc-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Input() navigationNodes: NavigationNode[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
