import { KeyNumber } from '@/types/index';

export type Dice = number[];

export type DiceObject = {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
} & KeyNumber<number>;
