import { Component, Input, ChangeDetectionStrategy, HostBinding } from '@angular/core';
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
  @HostBinding('class.isAdd')
  @Input() isAdd: boolean;

  altImage(img: any) {
    img.src = this.isAdd ? './assets/model-icons/add.png' : './assets/icon-196.png';
  }
}
