import { Dice } from '@/lib/dice';
import { allowedScoresType, derivativesType } from './constants';

export type AllowedScores = typeof allowedScoresType[number];

// eslint-disable-next-line no-unused-vars
export type YahtzeeScorecardBasics = { [K in AllowedScores]: number | null };
export type YahtzeeScordcardDerivatives = {
  // eslint-disable-next-line no-unused-vars
  [K in typeof derivativesType[number]]: number | null;
};
export type YahtzeeScorecard = YahtzeeScorecardBasics &
  YahtzeeScordcardDerivatives;

export type YahtzeeScorecardValidated = {
  // eslint-disable-next-line no-unused-vars
  [K in AllowedScores]: boolean;
};

// eslint-disable-next-line no-unused-vars
export type ValidateFunction = (dice: Dice) => boolean;
