import ColorSchemeToggle from '@/components/ColorSchemeToggle';
import YahtzeeGame from '@/components/YahtzeeGame';
import { Card, Stack, Center } from '@mantine/core';
import type { NextPage } from 'next';

const Home: NextPage = () => (
  <Center style={{ minHeight: '100' }}>
    <ColorSchemeToggle />
    <Card radius="md" shadow="md" withBorder>
      <Stack align="center">
        <YahtzeeGame />
      </Stack>
    </Card>
  </Center>
);

export default Home;
