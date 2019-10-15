import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { Store } from '@ngrx/store';
import * as fromRoot from '../+store/reducers';
import { SocketConnected, SocketDisconnected } from '../+store/actions/socket';

import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';
import { first, distinctUntilChanged } from 'rxjs/operators';



@Injectable()
export class SocketService {
  private socket: socketIo.Socket;

  constructor(private store: Store<fromRoot.State>) {
    this.socket = socketIo(environment.socket.baseUrl, environment.socket.config);
    this.socket.on('connect', () => {
      this.store.dispatch(new SocketConnected());
    });
    this.socket.on('disconnect', () => {
      this.store.dispatch(new SocketDisconnected());
    });
  }

  public initSocket(): void {
    this.socket = socketIo(environment.socket.baseUrl);
  }

  disconnect() {
    this.socket.disconnect();
  }

  request(event: string, data?: any): Observable<any> {
    if (data) {
      this.socket.emit(event, data);
    } else {
      this.socket.emit(event);
    }
    const observable = this.listen(`${event} Success`);
    return observable.pipe(first(), distinctUntilChanged());
  }

  emit(event: string, data?: any) {
    this.socket.emit(event, data);
  }

  off(event: string): void {
    this.socket.removeListener(event);
  }

  hasListener(listener: string): boolean {
    return this.socket.hasListeners(listener);
  }

  listen(event: string): Observable<any> {
    return new Observable(observer => {
      this.socket.on(event, data => {
        observer.next(data);
      });

      return () => this.socket.off(event);
    });
  }
}
