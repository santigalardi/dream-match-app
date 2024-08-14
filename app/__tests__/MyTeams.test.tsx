import { render, screen, waitFor } from '@testing-library/react';
import MyTeams from '@/app/myteams/page';
import mockLocalStorage from '../__mocks__/localStorageMock';
import { teamData } from '../__mocks__/teamData';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

beforeEach(() => {
  global.localStorage = mockLocalStorage as unknown as Storage;
  global.localStorage.setItem('teams', JSON.stringify(teamData));
});

afterEach(() => {
  global.localStorage.clear();
});

describe('MyTeams View', () => {
  it('renders correctly', async () => {
    render(<MyTeams />);

    const navBar = screen.getByTestId('nav-bar');
    expect(navBar).toBeInTheDocument();

    const teamCard = screen.getByTestId('team-card');
    expect(teamCard).toBeInTheDocument();

    const emptyCard = screen.getByTestId('empty-card');
    expect(emptyCard).toBeInTheDocument();
  });
});
