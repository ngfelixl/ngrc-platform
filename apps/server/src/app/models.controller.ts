import { Controller, Get, Post, Body } from '@nestjs/common';
import { Model } from '../models';

@Controller('models')
export class ModelsController {
  @Get()
  findAll() {
    return [];
  }

  @Get(':id')
  find() {
    return null;
  }

  @Post()
  addOne(@Body() body: Model) {
    console.log(body);
  }
}
