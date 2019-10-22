import { Nrf24Library, Nrf24State } from '../models';
export const lib: { Nrf24: Nrf24Library } = require('../../build/Release/nrf24.node');
import { Observable } from 'rxjs';

export class Nrf24 {
  private nativeNrf: Nrf24Library;
  public state$: Observable<Nrf24State>;

  constructor() {
    this.nativeNrf = new lib.Nrf24();
  }

  /**
   * Sends data to the Nrf24 module which is
   * going to be transmitted to the arduino via
   * 2.4GHz transmission.
   */
  public send() {

  }
}
