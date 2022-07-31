import { DiceObject } from '@/lib/dice';
import { createStyles, Group, UnstyledButton } from '@mantine/core';

interface DiceProps {
  dice: DiceObject;
  selectedDice: string[];
  handleSelect: (_k: string) => void;
}

const useStyles = createStyles((theme) => ({
  diceButton: {
    width: '100px',
    height: '100px',
    borderRadius: '1px',
    border: `1px solid ${theme.colorScheme === 'dark' ? '#fff' : '#000'}`,
    backgroundColor: theme.colorScheme === 'dark' ? '#ffffff' : '#000',
    fontSize: '3rem',
    fontWeight: 'bold',
    color: theme.colorScheme === 'dark' ? '#000' : '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const diceColors = {
  dark: ['#ffffff', '#000000'],
  light: ['#000000', '#ffffff'],
};

function Dice({ dice, selectedDice, handleSelect }: DiceProps) {
  const { classes } = useStyles();

  const diceButtons = Object.entries(dice).map(([k, v]) => {
    const active = selectedDice.includes(k) ? 1 : 0;
    return (
      <UnstyledButton
        className={classes.diceButton}
        key={k}
        onClick={() => handleSelect(k)}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? diceColors.dark[active]
              : diceColors.light[active],
          color:
            theme.colorScheme === 'dark'
              ? diceColors.dark[active === 1 ? 0 : 1]
              : diceColors.light[active === 1 ? 0 : 1],
        })}
      >
        {v}
      </UnstyledButton>
    );
  });
  return <Group>{diceButtons}</Group>;
}

export default Dice;
