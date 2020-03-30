import { Slot } from './slot';

export interface Model {
  id?: number;
  title: string;
  img: string | File;
  slots: Slot[];
}
