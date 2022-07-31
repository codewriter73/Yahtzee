import { render, screen } from '@testing-library/react';
import { ColorSchemeProvider } from '@mantine/core';
import Home from '@/pages/index';

describe('Home', () => {
  it('renders a buttons', () => {
    render(
      <ColorSchemeProvider colorScheme="light" toggleColorScheme={() => {}}>
        <Home />
      </ColorSchemeProvider>,
    );

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });
});
