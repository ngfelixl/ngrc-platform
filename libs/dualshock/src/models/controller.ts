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
