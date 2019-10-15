import { Pipe, PipeTransform } from '@angular/core';
import { Mapping } from '../modules/configuration/models/mapping';

@Pipe({ name: 'filterMappingsByModel' })
export class FilterMappingsByModelPipe implements PipeTransform {
  transform(mappings: Mapping[], modelId: string) {
    return mappings && mappings.filter(o => o.model_id === modelId);
  }
}
