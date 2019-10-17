export interface Controller {
  buttons: {
    dpadup?: boolean;
    dpaddown?: boolean;
    dpadleft?: boolean;
    dpadright?: boolean;
    r1?: boolean;
    l1?: boolean;
    triangle?: boolean;
    circle?: boolean;
    x?: boolean;
    square?: boolean;
  };
  sticks: {
    leftx?: number;
    lefty?: number;
    rightx?: number;
    righty?: number;
  };
  triggers: {
    r2?: number;
    l2?: number;
  };
}

export const initialControllerValue = {
  buttons: {
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
  },
  sticks: {
    leftx: 0,
    lefty: 0,
    rightx: 0,
    righty: 0,
  },
  triggers: {
    r2: 0,
    l2: 0,
  }
};
