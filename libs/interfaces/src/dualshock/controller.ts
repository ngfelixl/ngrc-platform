export interface Controller {
  buttons: {
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
    options: boolean;
    share: boolean;
  };
  sticks: {
    right: {
      x: number;
      y: number;
    };
    left: {
      x: number;
      y: number;
    };
  };
  triggers: {
    r2: number;
    l2: number;
  };
  gyro: {
    x: number;
    y: number;
    z: number;
  };
  acceleration: {
    x: number;
    y: number;
    z: number;
  };
}
