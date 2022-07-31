import { KeyString } from '@/types/index';
import { Dice } from '@/lib/dice';
import {
  allowedScores,
  FOUR_OF_A_KIND,
  FULL_HOUSE,
  NUM_REQ_FOR_UPPER,
  THREE_OF_A_KIND,
} from './constants';
import { ValidateFunction, YahtzeeScorecardValidated } from './types';

function validateUpper(dice: Dice, target: number) {
  const numberOfTarget = dice.reduce(
    (acc, curr) => acc + (curr === target ? 1 : 0),
    0,
  );
  return numberOfTarget >= NUM_REQ_FOR_UPPER;
}

function validateThreeOfAKind(dice: Dice) {
  const counts = dice.reduce((acc: KeyString<number>, curr) => {
    acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
    return acc;
  }, {});
  const keys = Object.keys(counts);
  const max = Math.max(...keys.map((key) => counts[key]));
  return max >= THREE_OF_A_KIND;
}

function validateFourOfAKind(dice: Dice) {
  const counts = dice.reduce((acc: KeyString<number>, curr) => {
    acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
    return acc;
  }, {});
  const keys = Object.keys(counts);
  const max = Math.max(...keys.map((key) => counts[key]));
  return max >= FOUR_OF_A_KIND;
}

function validateFullHouse(dice: Dice) {
  const counts = dice.reduce((acc: KeyString<number>, curr) => {
    acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
    return acc;
  }, {});
  let three = false;
  let two = false;
  Object.keys(counts).forEach((key) => {
    if (counts[key] === FULL_HOUSE[0]) {
      three = true;
    }
    if (counts[key] === FULL_HOUSE[1]) {
      two = true;
    }
  });
  return three && two;
}

function validateSmallStraight(dice: Dice) {
  const sortedArr = dice.sort((a, b) => a - b);
  const sorted = new Set(sortedArr);
  const expected = [
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6],
  ];
  let found = false;
  expected.forEach((exp) => {
    let every = true;
    exp.forEach((e) => {
      if (!sorted.has(e)) every = false;
    });
    if (every) found = true;
  });
  return found;
}

function validateLargeStraight(dice: Dice) {
  const sortedArr = dice.sort((a, b) => a - b);
  const sorted = new Set(sortedArr);
  const expected = [
    [1, 2, 3, 4, 5],
    [2, 3, 4, 5, 6],
  ];
  let found = false;
  expected.forEach((exp) => {
    let every = true;
    exp.forEach((e) => {
      if (!sorted.has(e)) every = false;
    });
    if (every) found = true;
  });
  return found;
}

function validateYahtzee(dice: Dice) {
  const target = dice[0];
  return dice.every((d) => d === target);
}

export const validate: KeyString<ValidateFunction> = {
  ones: (dice: Dice) => validateUpper(dice, 1),
  twos: (dice: Dice) => validateUpper(dice, 2),
  threes: (dice: Dice) => validateUpper(dice, 3),
  fours: (dice: Dice) => validateUpper(dice, 4),
  fives: (dice: Dice) => validateUpper(dice, 5),
  sixes: (dice: Dice) => validateUpper(dice, 6),
  threeOfAKind: validateThreeOfAKind,
  fourOfAKind: validateFourOfAKind,
  fullHouse: validateFullHouse,
  smallStraight: validateSmallStraight,
  largeStraight: validateLargeStraight,
  chance: (_dice: Dice) => true,
  yahtzee: validateYahtzee,
};

export function validatedScoreCard(dice?: Dice): YahtzeeScorecardValidated {
  const valid: YahtzeeScorecardValidated = {} as YahtzeeScorecardValidated;
  allowedScores.forEach((key) => {
    if (allowedScores.includes(key)) {
      valid[key as keyof YahtzeeScorecardValidated] = dice
        ? validate[key](dice)
        : false;
    }
  });
  return valid;
}
