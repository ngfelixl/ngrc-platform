import { Mapping } from '../../models/mapping';
import { Subject } from 'rxjs';
import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Slot, DirectControl, RelativeControl } from '../../models';
import { Controller } from '@ngrc/interfaces/dualshock';
import { DualshockService } from './dualshock.service';

@WebSocketGateway(81, { transports: ['polling'] })
export class MappingService {
  mapping: Mapping;
  frequency = 100;
  output$ = new Subject<Uint8Array>();

  constructor() {}

  /* @SubscribeMessage('[Mapper] Set Mapping')
  setMapping(@MessageBody() mapping: Mapping): void {
    this.mapping = mapping;
  }

  @SubscribeMessage('[Mapper] Get Mapping')
  getMapping() {
    return this.mapping;
  } */

  set setFrequency(frequency: number) {
    this.frequency = frequency;
  }

  public map(state: Uint8Array, input: Controller): Uint8Array {
    if (!this.mapping || !this.mapping.slots) {
      return state;
    }

    const output = state; // new Uint8Array(5).fill(0);
    try {
      const usualSlots = this.mapping.slots.filter(o => o.type !== 'copy');
      const copySlots = this.mapping.slots.filter(o => o.type === 'copy');
      for (let slot of usualSlots) {
        switch (slot.type) {
          case 'direct':
            output[slot.port] = this.direct(slot, input);
            break;

          case 'relative':
            output[slot.port] = this.relative(state[slot.port], slot, input);
            break;

          case 'button':
            output[slot.port] = this.button(state[slot.port], slot, input);
            break;
        }
      }

      for (let slot of copySlots) {
        const res = slot.copy.invert ? (-1) * output[slot.copy.port] + 180 : output[slot.copy.port];
        output[slot.port] = res;
      }
    } catch(e) {
      console.log(`[Mapper] Can't map: `, e);
    }
    return output;
  }

  private direct(slot: Slot, input: Controller): number {
    try {
      const value = this.getAnalogValue(slot.direct, input);
      const inverted = slot.direct.invert ? value * (-1) + 255 : value;
      const res = map(inverted, 0, 255, slot.range.min, 180 - slot.range.max);
      return Math.round(res);
    } catch (e) {
      return 0;
    }
  }

  private relative(state: number, slot: Slot, input: Controller): number {
    const value = this.getAnalogValue(slot.relative, input);
    // const value = input.sticks[slot['relative'].controller];
    return 0;
  }

  private getAnalogValue(control: DirectControl | RelativeControl, input: Controller): number {
    const controller = control.controller;
    let value = 0;
    if (['l2', 'r2'].includes(controller)) {
      value = input.triggers[controller];
    } else {
      value = input.sticks[controller];
    }
    return value;
  }


  private button(state: number, slot: Slot, input: Controller): number {
    const buttonDec = input.buttons[slot.button.decrease.controller];
    const buttonInc = input.buttons[slot.button.increase.controller];
    const dec = buttonDec ? -slot.button.decrease.variation * (1 / this.frequency) : 0;
    const inc = buttonInc ? slot.button.increase.variation * (1 / this.frequency) : 0;
    let nextValue = state + dec + inc;
    if (nextValue > slot.range.max) {
      nextValue = slot.range.max;
    } else if (nextValue < slot.range.min) {
      nextValue = slot.range.min;
    }
    return nextValue;
  }
}


function map(val: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  return (val - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}
