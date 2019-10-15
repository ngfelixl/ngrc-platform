import { Slot } from './slot';

export interface Mapping {
  id?: number;
  title: string;
  model_id: number;
  slots: Slot[];
}
