// validation
export const NUM_REQ_FOR_UPPER = 3;
export const THREE_OF_A_KIND = 3;
export const FOUR_OF_A_KIND = 4;
export const FULL_HOUSE = [3, 2];
// yahtzee dice
export const DICE_COUNT = 5;
export const NUM_OF_ROLLS = 3;
// score
export const FULL_HOUSE_SCORE = 25;
export const SMALL_STRAIGHT_SCORE = 30;
export const LARGE_STRAIGHT_SCORE = 40;
export const YAHTZEE_SCORE = 50;
// bonus
export const BONUS_SCORE = 35;
export const REQUIRED_BONUS_SCORE = 63;

// allowedScores and AllowedScore must both be initiated
// 1. to allow to use with typescript
// 2. Allow normal array function ssuch as includes
export const uppers = [
  'ones',
  'twos',
  'threes',
  'fours',
  'fives',
  'sixes',
];

export const lowers = [
  'threeOfAKind',
  'fourOfAKind',
  'fullHouse',
  'smallStraight',
  'largeStraight',
  'chance',
  'yahtzee',
];

export const allowedScores = lowers.concat(uppers);

export const allowedScoresType = [
  'ones',
  'twos',
  'threes',
  'fours',
  'fives',
  'sixes',
  'threeOfAKind',
  'fourOfAKind',
  'fullHouse',
  'smallStraight',
  'largeStraight',
  'chance',
  'yahtzee',
] as const;

export const derivativesType = [
  'bonus',
  'upperTotal',
  'lowerTotal',
  'grandTotal',
] as const;
