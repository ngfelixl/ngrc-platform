import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { WebsocketGateway } from './websocket.gateway';
import { ModelsModule } from './models/models.module';
import { MappingsModule } from './mappings/mappings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from './models/model.entity';
import { Mapping } from './mappings/mapping.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/../ngrc-platform`
    }),
    ModelsModule,
    MappingsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.db',
      synchronize: true,
      logging: true,
      entities: [Model, Mapping],
    })
  ],
  providers: [
    WebsocketGateway
  ],
})
export class AppModule {}
