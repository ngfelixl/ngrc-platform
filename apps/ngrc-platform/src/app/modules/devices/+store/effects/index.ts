import { NrfEffects } from './nrf.effect';
import { DualshockEffects } from './dualshock.effect';
import { RaspberrypiEffects } from './raspberrypi.effects';

export const effects: any[] = [
  DualshockEffects,
  NrfEffects,
  RaspberrypiEffects
];
