import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayInit } from '@nestjs/websockets';

@WebSocketGateway(81, { transports: ['polling'] })
export class WebsocketGateway implements OnGatewayInit {
  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    return data;
  }

  afterInit() {
    console.log('Gateway initialized');
  }
}
