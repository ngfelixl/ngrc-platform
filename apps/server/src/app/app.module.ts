import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { gateways } from './gateways';
import { imageFileFilter } from './helpers';
import { Mapping } from './mappings/mapping.entity';
import { MappingsModule } from './mappings/mappings.module';
import { Model } from './models/model.entity';
import { ModelsModule } from './models/models.module';

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
    ...gateways
  ],
})
export class AppModule {}
