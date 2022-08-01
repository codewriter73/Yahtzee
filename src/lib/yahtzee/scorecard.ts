import { Dice, getSum } from '@/lib/dice';
import {
  BONUS_SCORE,
  FULL_HOUSE_SCORE,
  LARGE_STRAIGHT_SCORE,
  lowers,
  REQUIRED_BONUS_SCORE,
  SMALL_STRAIGHT_SCORE,
  uppers,
  YAHTZEE_SCORE,
} from './constants';
import { YahtzeeScorecard } from './types';

export const newScorecard = (): YahtzeeScorecard => ({
  ones: null,
  twos: null,
  threes: null,
  fours: null,
  fives: null,
  sixes: null,
  bonus: 0,
  upperTotal: 0,
  threeOfAKind: null,
  fourOfAKind: null,
  fullHouse: null,
  smallStraight: null,
  largeStraight: null,
  chance: null,
  yahtzee: null,
  lowerTotal: 0,
  grandTotal: 0,
});

export const scoreMove = {
  ones: (dice: Dice) => getSum(dice.filter((d) => d === 1)),
  twos: (dice: Dice) => getSum(dice.filter((d) => d === 2)),
  threes: (dice: Dice) => getSum(dice.filter((d) => d === 3)),
  fours: (dice: Dice) => getSum(dice.filter((d) => d === 4)),
  fives: (dice: Dice) => getSum(dice.filter((d) => d === 5)),
  sixes: (dice: Dice) => getSum(dice.filter((d) => d === 6)),
  threeOfAKind: getSum,
  fourOfAKind: getSum,
  fullHouse: () => FULL_HOUSE_SCORE,
  smallStraight: () => SMALL_STRAIGHT_SCORE,
  largeStraight: () => LARGE_STRAIGHT_SCORE,
  yahtzee: () => YAHTZEE_SCORE,
  chance: getSum,
};

export function checkIfFinished(score: YahtzeeScorecard) {
  const upperFinished = uppers.every(
    (u) => score[u as keyof YahtzeeScorecard] !== null,
  );
  const lowerFinished = lowers.every(
    (l) => score[l as keyof YahtzeeScorecard] !== null,
  );
  return upperFinished && lowerFinished;
}

export function getUpperSum(scorecard: YahtzeeScorecard) {
  let sum = 0;
  uppers.forEach((u) => {
    const upper = u as keyof YahtzeeScorecard;
    if (scorecard[upper]) {
      sum += scorecard[upper] as number;
    }
  });
  return sum;
}

export function getLowerSum(scorecard: YahtzeeScorecard) {
  let sum = 0;
  lowers.forEach((l) => {
    const lower = l as keyof YahtzeeScorecard;
    if (scorecard[lower]) {
      sum += scorecard[lower] as number;
    }
  });
  return sum;
}

export function getBonus(scorecard: YahtzeeScorecard): number {
  return getUpperSum(scorecard) >= REQUIRED_BONUS_SCORE ? BONUS_SCORE : 0;
}
