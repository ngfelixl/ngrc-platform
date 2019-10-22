import { DualshockLibrary, DualshockState } from '../models';
export const lib: { Dualshock: DualshockLibrary } = require('../../build/Release/nrf24.node');
import { Observable } from 'rxjs';

export class Nrf24 {
  private nativeDualshock: DualshockLibrary;
  public state$: Observable<DualshockState>;

  constructor() {
    this.nativeDualshock = new lib.Dualshock();
  }
}
