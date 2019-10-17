import { Slot } from '../../models';

export interface MappingDto {
  id: number;
  title: string;
  modelId: number;
  slots: Slot[];
}
