import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { first, distinctUntilChanged } from 'rxjs/operators';
import { socketConnected, socketDisconnected } from '../+store/actions';
import { State } from '../+store/reducers';

@Injectable()
export class SocketService {
  private socket: SocketIOClient.Socket;

  constructor(private store: Store<State>) {
    this.socket = io(environment.socket.baseUrl, environment.socket.config);
    this.socket.on('connect', () => {
      this.store.dispatch(socketConnected());
    });
    this.socket.on('disconnect', () => {
      this.store.dispatch(socketDisconnected());
    });
  }

  public initSocket(): void {
    this.socket = io(environment.socket.baseUrl);
  }

  disconnect() {
    this.socket.disconnect();
  }

  request<T = unknown>(event: string, data?: any): Observable<T> {
    return new Observable(observer => {
      const socket = this.socket.emit(event, data, (ack: T) => observer.next(ack));

      return () => {
        socket.off(event);
      }
    });
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

  listen<T = unknown>(event: string): Observable<T> {
    return new Observable(observer => {
      this.socket.on(event, (data: T) => {
        observer.next(data);
      });

      return () => this.socket.off(event);
    });
  }
}
