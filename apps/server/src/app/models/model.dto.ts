import { Slot } from '@ngrc/interfaces/models';

export interface ModelDto {
  id: number;
  title: string;
  img: string;
  slots: Slot[];
}
