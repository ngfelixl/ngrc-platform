import { Slot } from './slot';

export interface Model {
  id?: string;
  title: string;
  img: string | File;
  slots: Slot[];
}
