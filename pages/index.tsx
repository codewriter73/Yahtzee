import ColorSchemeToggle from '@/components/ColorSchemeToggle';
import YahtzeeGame from '@/components/YahtzeeGame';
import { Card, Stack, Center } from '@mantine/core';
import type { NextPage } from 'next';

const Home: NextPage = () => (
  <Center style={{ minHeight: '100%' }}>
    <Card radius="md" shadow="md" withBorder>
      <Stack align="center">
        <ColorSchemeToggle />
        <YahtzeeGame />
      </Stack>
    </Card>
  </Center>
);

export default Home;
