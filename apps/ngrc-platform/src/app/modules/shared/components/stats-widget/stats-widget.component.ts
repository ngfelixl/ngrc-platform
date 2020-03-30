import { Component, Input } from '@angular/core';
import { Nrf24Stats } from '@ngrc/interfaces/nrf24';

@Component({
  selector: 'ngrc-stats-widget',
  templateUrl: './stats-widget.component.html'
})
export class StatsWidgetComponent {
  @Input() stats: Nrf24Stats;

  constructor() {}

  get percentage() {
    if (!this.stats) {
      return [0];
    }

    return [this.stats.TotalTx_Ok / (this.stats.TotalTx_Err + this.stats.TotalTx_Ok) * 100];
  }
}
