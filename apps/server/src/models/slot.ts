export interface Slot {
  port: number;
  title: string;
  type?: string;
  range?: {
    min: number,
    max: number
  };
  direct?: DirectControl;
  copy?: CopyControl;
  relative?: RelativeControl;
  threshold?: ThresholdControl;
  button?: ButtonControl;
}

export interface DirectControl {
  controller: string;
  invert: boolean;
}
export interface RelativeControl {
  controller: string;
  variation: number;
  invert: boolean;
  center: number;
}
export interface ThresholdControl {
  controller: string;
  variation: number;
  min: number;
  max: number;
}
export interface ButtonControl {
  decrease: {
    controller: string,
    variation: number
  };
  increase: {
    controller: string,
    variation: number
  };
}

export interface CopyControl {
  port: number;
  invert: boolean;
}
