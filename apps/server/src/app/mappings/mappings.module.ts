import { Module } from '@nestjs/common';
import { MappingsController } from './mappings.controller';
import { MappingsService } from './mappings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mapping } from './mapping.entity';
import { MapService } from './map.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Mapping ])
  ],
  controllers: [
    MappingsController
  ],
  providers: [
    MappingsService,
    MapService
  ],
  exports: [
    MappingsService,
    MapService
  ]
})
export class MappingsModule {}
