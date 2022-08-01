/* eslint-disable no-nested-ternary */
import { DiceObject } from '@/lib/dice';
import { createStyles, Group, UnstyledButton } from '@mantine/core';

interface DiceProps {
  dice: DiceObject;
  selectedDice: string[];
  handleSelect: (_k: string) => void;
}

const useStyles = createStyles(() => ({
  diceButton: {
    width: '100px',
    height: '100px',
    borderRadius: '1px',
    border: '1px solid #000',
    fontSize: '3rem',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function Dice({ dice, selectedDice, handleSelect }: DiceProps) {
  const { classes } = useStyles();

  const diceButtons = Object.entries(dice).map(([k, v]) => {
    const active = selectedDice.includes(k);
    return (
      <UnstyledButton
        className={classes.diceButton}
        key={k}
        onClick={() => handleSelect(k)}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? active
                ? 'rgba(0, 0, 0, 0.7)'
                : theme.colors.gray[4]
              : active
                ? theme.colors.gray[9]
                : 'white',
          color: active ? 'white' : 'black',
        })}
      >
        {v}
      </UnstyledButton>
    );
  });
  return <Group>{diceButtons}</Group>;
}

export default Dice;
