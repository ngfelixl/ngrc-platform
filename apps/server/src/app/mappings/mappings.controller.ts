import { Controller, Get, Post, Body } from '@nestjs/common';
import { Mapping } from '../../models';

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
  addOne(@Body() body: Mapping) {
    console.log(body);
  }
}
