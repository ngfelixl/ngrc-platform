import { Slot } from './slot';

export interface Model {
  id?: number;
  title: string;
  slots: Slot[];
  img: string | any;
}
