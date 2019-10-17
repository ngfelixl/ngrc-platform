import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mapping } from './mapping.entity';
import { Repository } from 'typeorm';
import { MappingDto } from './mapping.dto';

@Injectable()
export class MappingsService {
  constructor(
    @InjectRepository(Mapping)
    private readonly mappingRepository: Repository<Mapping>
  ) {}

  async findAll(): Promise<MappingDto[]> {
    const mappings = await this.mappingRepository.find();
    const mappingsDto = mappings.map(mapping => ({...mapping, slots: JSON.parse(mapping.slots)}) as MappingDto);
    return mappingsDto;
  }

  async findById(id: number): Promise<MappingDto> {
    const mappings = await this.mappingRepository.find({ id });
    if (!mappings || !mappings[0]) {
      return null;
    }

    const mapping = mappings[0];
    return {...mapping, slots: JSON.parse(mapping.slots)};
  }

  async add(mappingDto: MappingDto): Promise<MappingDto> {
    const mapping: Mapping = {
      ...mappingDto,
      slots: JSON.stringify(mappingDto.slots)
    };
    const databaseMapping = await this.mappingRepository.save(mapping);
    return {...databaseMapping, slots: JSON.parse(databaseMapping.slots)};
  }

  async removeOne(id: number): Promise<Mapping> {
    const mapping = await this.mappingRepository.findOne(id);
    return await this.mappingRepository.remove(mapping);
  }

  async updateOne(update: { id: number, changes: Partial<MappingDto> }) {
    const changes = {
      ...update.changes,
      slots: update.changes.slots ? JSON.stringify(update.changes.slots) : undefined
    } as Mapping;
    await this.mappingRepository.update(update.id, changes);
  }
}
