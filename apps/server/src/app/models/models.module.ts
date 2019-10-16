import { Module } from '@nestjs/common';
import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from './model.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Model ])
  ],
  providers: [
    ModelsService
  ],
  controllers: [
    ModelsController
  ],
})
export class ModelsModule {}
