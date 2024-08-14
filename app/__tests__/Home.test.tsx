import { fireEvent, render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home View', () => {
  it('renders correctly', async () => {
    render(<Home />);
    const welcome = screen.getByText('¡Bienvenido a Dream Match App!');
    expect(welcome).toBeInTheDocument();
    const myTeamsLink = screen.getByTestId('my-teams-link');
    expect(myTeamsLink).toBeInTheDocument();
    fireEvent.mouseEnter(myTeamsLink);
    expect(await screen.findByText('¡Crea el partido de tus sueños!')).toBeInTheDocument();
  });
});
