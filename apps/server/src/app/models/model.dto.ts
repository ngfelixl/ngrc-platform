import { Slot } from '../../models';

export interface ModelDto {
  id: number;
  title: string;
  img: string;
  slots: Slot[];
}
