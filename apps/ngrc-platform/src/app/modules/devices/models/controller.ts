export interface Controller {
  dpadup: boolean;
  dpaddown: boolean;
  dpadleft: boolean;
  dpadright: boolean;
  r1: boolean;
  l1: boolean;
  triangle: boolean;
  circle: boolean;
  x: boolean;
  square: boolean;

  left: { x: number, y: number };
  right: { x: number, y: number };
  r2: number;
  l2: number;
}

export const controllerInitialValue: Controller = {
  dpadup: false,
  dpaddown: false,
  dpadleft: false,
  dpadright: false,
  r1: false,
  l1: false,
  triangle: false,
  circle: false,
  x: false,
  square: false,

  left: { x: 128, y: 128 },
  right: { x: 128, y: 128 },
  r2: 0,
  l2: 0,
};
