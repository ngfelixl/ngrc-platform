import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-model-card',
  template: `
    <mat-card>
      <mat-card-header>
        <img #img
          mat-card-avatar
          src="{{environment.api}}/images/{{logo}}"
          (error)="altImage(img)">
        <mat-card-title><ng-content></ng-content></mat-card-title>
        <mat-card-subtitle>{{hint}}</mat-card-subtitle>
      </mat-card-header>
    </mat-card>`,
  styles: [
    `
    :host { display: flex; }
    mat-card { cursor: pointer; flex: 1; }
    mat-card-title { font-size: 24px !important; }
    img { width: 72px; height: 72px; border-radius: 18px; }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModelCardComponent {
  environment = environment;
  @Input() logo;
  @Input() hint;

  altImage(img: any) {
    img.src = './assets/icon-196.png';
  }
}
