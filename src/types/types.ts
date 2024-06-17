export enum Direction {
  Ascending = 'ascending',
  Descending = 'descending',
}

export enum ElementStates {
  Default = 'default',
  Changing = 'changing',
  Modified = 'modified',
}

export enum Part {
  left = 'left',
  right = 'right',
  pivot = 'pivot',
}

export interface IColorNumbers {
  value: number;
  id?: string;
  part?: Part;
  color: ElementStates;
}

export interface IColor {
  index: number | null;
  color: ElementStates;
}
