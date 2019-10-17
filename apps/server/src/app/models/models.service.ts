import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { Model } from './model.entity';
import { ModelDto } from './model.dto';
import { Mapping } from '../mappings/mapping.entity';

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

  async add(modelDto: ModelDto): Promise<ModelDto> {
    const model: Model = {
      ...modelDto,
      slots: JSON.stringify(modelDto.slots)
    };
    const databaseModel = await this.modelRepository.save(model);
    return {...databaseModel, slots: JSON.parse(databaseModel.slots)};
  }

  /**
   * Deletes the Model and all related Mappings
   */
  async removeOne(id: number): Promise<Model> {
    const model = await Promise.all([
      this.modelRepository.findOne(id),
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Mapping)
        .where('modelId = :id', { id })
        .execute()
    ]);
    return await this.modelRepository.remove(model[0]);
  }
}
