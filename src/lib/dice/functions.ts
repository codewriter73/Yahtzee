import { SIDED_DICE } from './constants';
import { Dice, DiceObject } from './types';

export function rollDice(num: number): Dice {
  const result: number[] = [];
  for (let i = 0; i < num; i += 1) {
    result.push(Math.floor(Math.random() * SIDED_DICE) + 1);
  }
  return result;
}

export function getSum(dice: Dice): number {
  const score = dice.reduce((acc, curr) => acc + curr, 0);
  return score;
}

export function diceObjectToDice(diceObject: DiceObject): Dice {
  return [...Object.values(diceObject)];
}
