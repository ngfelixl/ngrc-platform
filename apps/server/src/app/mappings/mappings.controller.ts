import { Controller, Get, Post, Body } from '@nestjs/common';
import { MappingDto } from './mapping.dto';

@Controller('mappings')
export class MappingsController {
  @Get()
  findAll() {
    return [];
  }

  @Get(':id')
  find() {
    return null;
  }

  @Post()
  addOne(@Body() body: MappingDto) {
    console.log(body);
  }
}
