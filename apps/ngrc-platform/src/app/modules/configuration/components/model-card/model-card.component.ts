import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-model-card',
  templateUrl: './model-card.component.html',
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
