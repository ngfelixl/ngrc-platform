import { Slot } from './slot';

export interface Mapping {
  id?: number;
  title: string;
  modelId: number;
  slots: Slot[];
}
