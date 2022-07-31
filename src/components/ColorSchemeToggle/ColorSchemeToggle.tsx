import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { Moon, Sun } from 'phosphor-react';

function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
      <ActionIcon
        onClick={() => toggleColorScheme()}
        size="xl"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          color:
            theme.colorScheme === 'dark'
              ? theme.colors.yellow[4]
              : theme.colors.blue[6],
        })}
      >
        {colorScheme === 'dark' ? (
          <Sun size={20} />
        ) : (
          <Moon size={20} />
        )}
      </ActionIcon>
  );
}

export default ColorSchemeToggle;
