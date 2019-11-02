import { Controller, Get, Post, Body, Delete, Param, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ModelsService } from './models.service';
import { ModelDto } from './model.dto';
import { Model } from './model.entity';
import { diskStorage } from 'multer';
import { editFileName } from '../helpers';
import { join } from 'path';

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
  @UseInterceptors(FileInterceptor('img', { storage: diskStorage({
    destination: join(__dirname, 'images'),
    filename: editFileName
  }) }))
  addOne(@Body() model: Model, @UploadedFile() file) {
    return this.modelsService.add({...model, img: file.filename});
  }

  @Delete(':id')
  removeOne(@Param() params: {id: number}) {
    return this.modelsService.removeOne(params.id);
  }

  @Put(':id')
  updateOne(@Param() params: { id: number }, @Body() update: {id: number, changes: Partial<ModelDto>}) {
    return this.modelsService.updateOne(update);
  }
}
