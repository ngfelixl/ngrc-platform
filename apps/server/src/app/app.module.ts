import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { WebsocketGateway } from './websocket.gateway';
import { ModelsModule } from './models/models.module';
import { MappingsModule } from './mappings/mappings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from './models/model.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/../ngrc-platform`
    }),
    ModelsModule,
    MappingsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database1.db',
      synchronize: true,
      logging: false,
      entities: [Model],
    })
  ],
  providers: [
    WebsocketGateway
  ],
})
export class AppModule {}
