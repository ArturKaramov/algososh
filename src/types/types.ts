import { ElementStates } from './element-states';

export interface IColorNumbers {
  value: number;
  part?: 'left' | 'right';
  color: ElementStates;
}

export interface IColor {
  index: number | null;
  color: ElementStates;
}
