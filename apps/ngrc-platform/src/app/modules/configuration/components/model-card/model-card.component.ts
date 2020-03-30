import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'ngrc-model-card',
  templateUrl: './model-card.component.html',
  styleUrls: [ './model-card.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModelCardComponent {
  environment = environment;
  @Input() logo: string;
  @Input() hint: string;

  altImage(img: any) {
    img.src = './assets/icon-196.png';
  }
}
