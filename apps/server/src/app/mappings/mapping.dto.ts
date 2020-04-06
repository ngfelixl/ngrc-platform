import { Slot } from '@ngrc/interfaces/models';

export interface MappingDto {
  id: number;
  title: string;
  modelId: number;
  slots: Slot[];
}
