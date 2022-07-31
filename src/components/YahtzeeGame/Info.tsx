import { Group, Text } from '@mantine/core';

interface InfoProps {
  rollNumber: number;
  message: string;
}

function Info({ rollNumber, message }: InfoProps) {
  return (
    <Group>
      <Text>Roll Number: {rollNumber}</Text>
      <Text>{message}</Text>
    </Group>
  );
}

export default Info;
