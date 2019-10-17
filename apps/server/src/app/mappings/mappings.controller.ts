import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { MappingDto } from './mapping.dto';
import { MappingsService } from './mappings.service';

@Controller('mappings')
export class MappingsController {

  constructor(private readonly mappingsService: MappingsService) {}

  @Get()
  findAll(): Promise<MappingDto[]> {
    return this.mappingsService.findAll();
  }

  @Get(':id')
  async find(@Param() params: {id: number}): Promise<MappingDto> {
    return this.mappingsService.findById(params.id);
  }

  @Post()
  addOne(@Body() mapping: MappingDto) {
    return this.mappingsService.add(mapping);
  }

  @Delete(':id')
  removeOne(@Param() params: {id: number}) {
    return this.mappingsService.removeOne(params.id);
  }

  @Put(':id')
  updateOne(@Param() params: { id: number }, @Body() update: {id: number, changes: Partial<MappingDto>}) {
    return this.mappingsService.updateOne(update);
  }
}
