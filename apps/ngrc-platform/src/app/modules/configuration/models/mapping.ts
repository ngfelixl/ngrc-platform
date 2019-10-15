import { Slot } from './slot';

export interface Mapping {
  id?: string;
  title: string;
  model_id: string;
  slots: Slot[];
}
