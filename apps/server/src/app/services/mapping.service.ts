import { Mapping } from '../../models/mapping';
import { Subject } from 'rxjs';
import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Slot, DirectControl, RelativeControl } from '../../models';
import { Controller } from '@ngrc/dualshock';

@WebSocketGateway(81, { transports: ['polling'] })
export class MappingService {
  mapping: Mapping;
  frequency = 100;
  output$ = new Subject<Uint8Array>();

  @SubscribeMessage('[Mapper] Set Mapping')
  setMapping(@MessageBody() mapping: Mapping): void {
    this.mapping = mapping;
  }

  @SubscribeMessage('[Mapper] Get Mapping')
  getMapping() {
    return this.mapping;
  }

  set setFrequency(frequency: number) {
    this.frequency = frequency;
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
