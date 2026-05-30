import { render, screen, within } from '@testing-library/react';

import { App } from "./App";

describe('App.tsx', (): void => {
  it('renders the main portfolio sections', (): void => {
    render(<App />);

    const { getByRole } = screen;

    expect(getByRole('banner')).toBeInTheDocument();
    expect(getByRole('navigation', { name: /primary navigation/i })).toBeInTheDocument();
    expect(getByRole('main')).toBeInTheDocument();

    expect(getByRole('heading', { name: /joel spinelli/i })).toBeInTheDocument();
    expect(getByRole('heading', { name: /core technologies/i })).toBeInTheDocument();
    expect(getByRole('heading', { name: /case studies/i })).toBeInTheDocument();
    expect(getByRole('heading', { name: /get in touch/i })).toBeInTheDocument();

    expect(getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders visible labels for the professional links in the header', (): void => {
    render(<App />);

    const professionalLinks = within(screen.getByRole('banner')).getByRole('navigation', { name: /professional links/i });

    expect(within(professionalLinks).getByText('GitHub')).toBeVisible();
    expect(within(professionalLinks).getByText('LinkedIn')).toBeVisible();
    expect(within(professionalLinks).getByText('Download CV')).toBeVisible();
  });
});
