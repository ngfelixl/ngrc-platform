import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';


import { WebsocketGateway } from './websocket.gateway';
import { ModelsController } from './models.controller';
import { MappingsController } from './mappings.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/../ngrc-platform`
    })
  ],
  controllers: [
    ModelsController,
    MappingsController
  ],
  providers: [
    WebsocketGateway
  ],
})
export class AppModule {}
