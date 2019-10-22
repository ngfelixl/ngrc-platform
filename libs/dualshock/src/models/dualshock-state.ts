import { Controller } from './controller';

export interface DualshockState {
  connected: boolean;
  battery: number;
  controller: Controller;
}
