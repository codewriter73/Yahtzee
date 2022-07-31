import ColorSchemeToggle from '@/components/ColorSchemeToggle';
import { Card, Stack, Center } from '@mantine/core';
import type { NextPage } from 'next';

const Home: NextPage = () => (
  <Center style={{ height: '100vh' }}>
    <Card radius="md" shadow="md" withBorder>
      <Stack align="center">
        <ColorSchemeToggle />
      </Stack>
    </Card>
  </Center>
);

export default Home;
