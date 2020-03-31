import { OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';
import { environment } from '../environments/environment';

@WebSocketGateway(environment.port, { transports: ['polling'] })
export class WebsocketGateway implements OnGatewayInit {
  // @SubscribeMessage('events')
  // handleEvent(@MessageBody() data: string): string {
  //   return data;
  // }

  afterInit() {
    console.log('Gateway initialized');
  }
}
