import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Model } from './model.entity';
import { ModelDto } from './model.dto';

@Injectable()
export class ModelsService {
  constructor(
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>
  ) {}

  async findAll(): Promise<ModelDto[]> {
    const models = await this.modelRepository.find();
    const modelsDto = models.map(model => ({...model, slots: JSON.parse(model.slots)}) as ModelDto);
    return modelsDto;
  }

  async findById(id: number): Promise<ModelDto> {
    const models = await this.modelRepository.find({ id });
    if (!models || !models[0]) {
      return null;
    }

    const model = models[0];
    return {...model, slots: JSON.parse(model.slots)};
  }

  async add(modelDto: ModelDto): Promise<Model> {
    const model: Model = {
      ...modelDto,
      slots: JSON.stringify(modelDto.slots)
    };
    return await this.modelRepository.save(model);
  }

  async removeOne(id: number): Promise<Model> {
    const model = await this.modelRepository.findOne(id);
    return await this.modelRepository.remove(model);
  }
}
