import { render, screen, waitFor } from '@testing-library/react';
import Edit from '@/app/edit/[id]/page';
import mockLocalStorage from '../__mocks__/localStorageMock';
import { teamData } from '../__mocks__/teamData';
import { useParams } from 'next/navigation';
import { countryData } from '../__mocks__/countryData';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock('../utils/searchPlayer', () => ({
  fetchCountries: jest.fn(() => Promise.resolve(countryData)),
}));

beforeEach(() => {
  global.localStorage = mockLocalStorage as unknown as Storage;
  global.localStorage.setItem('teams', JSON.stringify(teamData));

  (useParams as jest.Mock).mockReturnValue({
    id: 'cce64165-f8fa-47ff-87c9-114c27ec812d',
  });
});

afterEach(() => {
  global.localStorage.clear();
});

describe('Edit Page', () => {
  it('renders the team creation form with the correct team data', async () => {
    render(<Edit />);

    const navBar = screen.getByTestId('nav-bar');
    expect(navBar).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Editar Equipo')).toBeInTheDocument();
    });

    await waitFor(() => {
      const teamNameInput = screen.getByTestId('team-name-input');
      expect(teamNameInput).toHaveValue('BocaJuniors');
    });
  });
});
