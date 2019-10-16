import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { Model } from './model.entity';
import { ModelsService } from './models.service';
import { ModelDto } from './model.dto';

@Controller('models')
export class ModelsController {

  constructor(private readonly modelsService: ModelsService) {}

  @Get()
  findAll(): Promise<ModelDto[]> {
    return this.modelsService.findAll();
  }

  @Get(':id')
  async find(@Param() params: {id: number}): Promise<ModelDto> {
    return this.modelsService.findById(params.id);
  }

  @Post()
  addOne(@Body() model: ModelDto) {
    return this.modelsService.add(model);
  }

  @Delete(':id')
  removeOne(@Param() params: {id: number}) {
    return this.modelsService.removeOne(params.id);
  }

}
