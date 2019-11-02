import { Module } from '@nestjs/common';

import { WebsocketGateway } from './websocket.gateway';
import { ModelsModule } from './models/models.module';
import { MappingsModule } from './mappings/mappings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from './models/model.entity';
import { Mapping } from './mappings/mapping.entity';
import { services } from './services';
import { MulterModule } from '@nestjs/platform-express';
import { imageFileFilter } from './helpers';
import { join } from 'path';

@Module({
  imports: [
    ModelsModule,
    MappingsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, 'database.db'),
      synchronize: true,
      logging: false,
      entities: [Model, Mapping],
    }),
    MulterModule.register({
      dest: join(__dirname, 'images'),
      limits: { files: 1 },
      fileFilter: imageFileFilter
    })
  ],
  providers: [
    WebsocketGateway,
    ...services
  ],
})
export class AppModule {}
