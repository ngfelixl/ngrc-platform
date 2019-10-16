import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mapping } from './mapping.entity';
import { Repository } from 'typeorm';
import { MappingDto } from './mapping.dto';

@Injectable()
export class MappingsService {
  constructor(
    @InjectRepository(Mapping)
    private readonly MappingRepository: Repository<Mapping>
  ) {}

  async findAll(): Promise<MappingDto[]> {
    const Mappings = await this.MappingRepository.find();
    const MappingsDto = Mappings.map(mapping => ({...mapping, slots: JSON.parse(mapping.slots)}) as MappingDto);
    return MappingsDto;
  }

  async findById(id: number): Promise<MappingDto> {
    const mappings = await this.MappingRepository.find({ id });
    if (!mappings || !mappings[0]) {
      return null;
    }

    const mapping = mappings[0];
    return {...mapping, slots: JSON.parse(mapping.slots)};
  }

  async add(mappingDto: MappingDto): Promise<Mapping> {
    const mapping: Mapping = {
      ...mappingDto,
      slots: JSON.stringify(mappingDto.slots)
    };
    return await this.MappingRepository.save(mapping);
  }

  async removeOne(id: number): Promise<Mapping> {
    const mapping = await this.MappingRepository.findOne(id);
    return await this.MappingRepository.remove(mapping);
  }
}
