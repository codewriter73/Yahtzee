import { useEffect, useState } from 'react';
import { KeyString } from '@/types/index';
import {
  defaultDiceObject,
  DiceObject,
  diceObjectToDice,
  rollDice,
} from '@/lib/dice';
import { DICE_COUNT, NUM_OF_ROLLS } from './constants';
import {
  checkIfFinished,
  getBonus,
  getLowerSum,
  getUpperSum,
  newScorecard as generateNewScorecard,
  scoreMove,
} from './scorecard';
import {
  AllowedScores,
  YahtzeeScorecard,
  YahtzeeScorecardValidated,
} from './types';
import { validatedScoreCard } from './validation';

export default function useYahtzee() {
  const [scorecard, setScorecard] = useState<YahtzeeScorecard>(
    generateNewScorecard(),
  );
  const [scorecardValidated, setScorecardValidated] = useState<YahtzeeScorecardValidated>(
      {} as YahtzeeScorecardValidated,
  );
  const [rollNumber, setRollNumber] = useState<number>(0);
  const [dice, setDice] = useState<DiceObject>({ ...defaultDiceObject });
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (Math.max(...diceObjectToDice(dice)) === 0) {
      setScorecardValidated(validatedScoreCard());
    } else {
      setScorecardValidated(validatedScoreCard(diceObjectToDice(dice)));
    }
  }, [dice]);

  // everytime the scorecard gets updated, start a new turn
  useEffect(() => {
    setDice({ ...defaultDiceObject });
    setRollNumber(0);
    const finished = checkIfFinished(scorecard);
    if (finished) {
      setMessage('Game Over');
    } else {
      setMessage('');
    }
  }, [scorecard]);

  // various checks, then roll the dice
  function roll(keep: string[]) {
    if (rollNumber === NUM_OF_ROLLS) {
      setMessage('You have no more rolls left');
      return;
    }
    if (keep && keep.length > 0) {
      if (keep.length === DICE_COUNT) {
        setMessage("You can't keep all the dice");
        return;
      }
      if (rollNumber === 0) {
        setMessage("You can't keep dice on your first roll");
        return;
      }
      // check if all numbers in keep exist in dice
      let allFound = true;
      keep.forEach((d) => {
        if (parseInt(d, 10) < 0 || parseInt(d, 10) > 4) allFound = false;
      });
      if (!allFound) {
        setMessage("You can't keep dice that you haven't rolled");
        return;
      }
    }
    const numToRole = DICE_COUNT - (keep ? keep.length : 0);
    const rolledDice = rollDice(numToRole);
    const newDice: KeyString<number> & DiceObject = { ...dice };

    let j = 0;
    for (let i = 0; i < DICE_COUNT; i += 1) {
      if (keep && keep.includes(i.toString())) {
        newDice[i] = dice[i];
      } else {
        newDice[i] = rolledDice[j];
        j += 1;
      }
    }

    setDice(newDice);
    setRollNumber((r) => r + 1);
  }

  // score the current roll, and calculate the derivative scorecard values
  function score(scoreType: AllowedScores) {
    if (scorecard[scoreType]) {
      setMessage('You have already scored this');
      return;
    }
    let newScore = 0;
    if (scorecardValidated[scoreType]) {
      newScore = scoreMove[scoreType](diceObjectToDice(dice));
    }
    let newScorecard: YahtzeeScorecard = {
      ...scorecard,
      [scoreType]: newScore,
    };
    const bonus = getBonus(newScorecard);
    const upperTotal = getUpperSum(newScorecard) + bonus;
    const lowerTotal = getLowerSum(newScorecard);
    const grandTotal = upperTotal + lowerTotal;
    newScorecard = {
      ...newScorecard,
      bonus,
      upperTotal,
      lowerTotal,
      grandTotal,
    };

    setScorecard(newScorecard);
    setScorecardValidated(validatedScoreCard(diceObjectToDice(dice)));
  }

  function newGame() {
    setScorecard(generateNewScorecard());
    setScorecardValidated(validatedScoreCard());
  }

  return {
    scorecard,
    scorecardValidated,
    rollNumber,
    dice,
    roll,
    message,
    score,
    newGame,
  };
}
