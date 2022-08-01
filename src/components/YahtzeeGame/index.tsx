import { AllowedScores, useYahtzee } from '@/lib/yahtzee';
import {
  Card, Group, Stack, Title,
} from '@mantine/core';
import { useState } from 'react';
import Control from './Controls';
import Dice from './Dice';
import Info from './Info';
import Scorecard from './Scorecard';

function YahtzeeGame() {
  const {
    scorecard,
    scorecardValidated,
    rollNumber,
    dice,
    roll,
    score,
    newGame,
    message,
  } = useYahtzee();
  const [selectedDice, setSelectedDice] = useState<string[]>([]);

  const handleDiceSelection = (index: string) => {
    let newSelectedDice = [...selectedDice];
    if (selectedDice.includes(index)) {
      newSelectedDice = selectedDice.filter((d) => d !== index);
    } else {
      newSelectedDice.push(index);
    }
    setSelectedDice(newSelectedDice);
  };
  const handleRoll = () => {
    // console.log('selectedDice', selectedDice);
    roll(selectedDice);
    setSelectedDice([]);
  };

  const handleNewGame = () => {
    newGame();
    setSelectedDice([]);
  };

  const handleScore = (type: string) => {
    score(type as AllowedScores);
    setSelectedDice([]);
  };

  return (
    <Card>
      <Group>
        <Stack style={{ height: '80vh' }} justify="space-between" align="center">
          <Title style={{ fontSize: '5rem' }}>Yahtzee</Title>
          <Stack align="center">
            <Info rollNumber={rollNumber} message={message} />
            <Dice
              dice={dice}
              selectedDice={selectedDice}
              handleSelect={handleDiceSelection}
            />
            <Control handleRoll={handleRoll} handleNewGame={handleNewGame} />
          </Stack>
          <div>&nbsp;</div>
        </Stack>
        <Scorecard
          scorecard={scorecard}
          scorecardValidated={scorecardValidated}
          handleScore={handleScore}
        />
      </Group>
    </Card>
  );
}

export default YahtzeeGame;
