import { SIDED_DICE } from './constants';
import { Dice, DiceObject } from './types';

const U8BIT_MAX = 255;

export function rollDice(num: number): Dice {
  let resultArr = window.crypto.getRandomValues(new Uint8Array(num));

  // The range for each int is 0-255 -> 42.5 intervals of 6
  // This means we have slightly higher chance of getting the numbers 1 to 3
  // we keep generating random arrays until all numbers have an equal chance
  // It will only recalculate 1.6% of the time
  // We can expand this to work for any sided dice;

  const mod = (U8BIT_MAX % SIDED_DICE) + 1;
  // the +1 is needed is because 0 is the start of the range
  const maxArray = Array.from({ length: mod }, (_, i) => i);
  const isUneven = (arr: Uint8Array) => {
    let even = false;
    maxArray.forEach((v) => {
      if (arr.includes(U8BIT_MAX - v)) {
        even = true;
      }
    });
    return even;
  };

  while (isUneven(resultArr)) {
    resultArr = window.crypto.getRandomValues(new Uint8Array(num));
  }
  // convert to dice numbers
  const result: Dice = Array(num).fill(0);
  for (let i = 0; i < num; i += 1) {
    result[i] = (resultArr[i] % SIDED_DICE) + 1;
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
