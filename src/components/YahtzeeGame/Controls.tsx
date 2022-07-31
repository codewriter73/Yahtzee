import { Group, Button } from '@mantine/core';

interface ControlProps {
  handleRoll: () => void;
  handleNewGame: () => void;
}

function Control({ handleRoll, handleNewGame }: ControlProps) {
  return (
    <Group>
      <Button onClick={handleNewGame}>New Game</Button>
      <Button onClick={handleRoll}>Roll</Button>
    </Group>
  );
}
export default Control;
