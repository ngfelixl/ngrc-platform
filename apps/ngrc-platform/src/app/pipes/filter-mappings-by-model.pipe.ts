import { Pipe, PipeTransform } from '@angular/core';
import { Mapping } from '@ngrc/interfaces/models';

@Pipe({ name: 'filterMappingsByModel' })
export class FilterMappingsByModelPipe implements PipeTransform {
  transform(mappings: Mapping[], modelId: number) {
    return mappings && mappings.filter(o => o.modelId === modelId);
  }
}
