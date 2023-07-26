import { ElementStates } from "./element-states";

export interface IColorNumbers {
  value: number;
  color: ElementStates;
}

export interface IColor {
  index: number | null;
  color: ElementStates;
}
