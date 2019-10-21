import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../../../services/socket.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngrc-stats-widget',
  templateUrl: './stats-widget.component.html'
})
export class StatsWidgetComponent implements OnInit {
  data$: Observable<Uint8Array>;

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.data$ = this.socketService.listen('[Nrf] Stats Data').pipe(
      map(data => {
        const success: number = data.TotalTx_Ok;
        const total: number = data.TotalTx_Err + data.TotalTx_Ok;
        const res = new Uint8Array(1).fill(success / total * 100);
        return res;
      })
    );
  }
}
