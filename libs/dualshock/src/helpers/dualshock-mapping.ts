import { DualshockState } from '@ngrc/dualshock-shared';

/**
 * ### Dualshock Mapping
 * Map HID buffer array to the dualshock state object.
 * The function makes use of bitwise operations because
 * some of the values, for example the x and square buttons
 * are bits in the HID data array.
 *
 * #### Example Bit-Wise operation:
 * 15 = [00001111];
 * test = [10100110];
 * test & 15 = [00000110];
 * @param data HID data array buffer
 *
 * @see https://www.psdevwiki.com/ps4/DS4-BT
 * @see https://eleccelerator.com/wiki/index.php?title=DualShock_4
 */
// tslint:disable:no-bitwise
export function dualshockMapping(data: Buffer): Partial<DualshockState> {
  const specialButtonsByte = data.readUInt8(6);
  const buttonByte = data.readUInt8(5);
  const dpadBits = buttonByte & 15;

  return {
    battery: data.readUInt8(12),
    controller: {
      sticks: {
        left: {
          x: data.readUInt8(1),
          y: data.readUInt8(2)
        },
        right: {
          x: data.readUInt8(3),
          y: data.readUInt8(4)
        }
      },
      buttons: {
        x: buttonByte & 32 ? true : false,
        square: buttonByte & 16 ? true : false,
        circle: buttonByte & 64 ? true : false,
        triangle: buttonByte & 128 ? true : false,
        l1: specialButtonsByte & 1 ? true : false,
        r1: specialButtonsByte & 2 ? true : false,
        dpadup: [0, 1, 7].includes(dpadBits),
        dpadright: [1, 2, 3].includes(dpadBits),
        dpaddown: [3, 4, 5].includes(dpadBits),
        dpadleft: [5, 6, 7].includes(dpadBits),
        options: specialButtonsByte & 32 ? true : false,
        share: specialButtonsByte & 16 ? true : false
      },
      triggers: {
        r2: data.readUInt8(9),
        l2: data.readUInt8(8)
      },
      gyro: {
        x: data.readInt16LE(13),
        y: data.readInt16LE(15),
        z: data.readInt16LE(17)
      },
      acceleration: {
        x: data.readInt16LE(19),
        y: data.readInt16LE(21),
        z: data.readInt16LE(23)
      }
    }
  };
}
// tslint:enable:no-bitwise
