import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngrc-nav-item',
  templateUrl: './nav-item.component.html',
  styles: [
    `.secondary { color: rgba(0, 0, 0, 0.54); }
    .selected { background-color: rgba(0, 0, 0, 0.1); }`,
  ],
})
export class NavItemComponent {
  @Input() icon = '';
  @Input() hint = '';
  @Input() routerLink: string | any[] = '/';
  @Input() selected: boolean;
  @Output() navigate = new EventEmitter();
}
