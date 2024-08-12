'use client';

import { FormEvent, useEffect, useState } from 'react';
import { fetchCompetitions, fetchCountries, fetchTeam, fetchTeams } from '../utils/searchPlayer';
import ImageWithFallback from './ImageWithFallback';
import FootballPitch, { Player, Position } from './FootballPitchEditable';
import PlayerSearch from './PlayerSearch';
import { useRouter } from 'next/navigation';

interface Team {
  team_key: string;
  team_name: string;
  team_badge: string;
}

let equipoA = [
  {
    player_id: '1',
    player_name: 'Marchesin',
    player_image: 'https://apiv3.apifootball.com/badges/players/6424_a-marchesin.jpg',
  },
  {
    player_id: '2',
    player_name: 'Van Dijk',
    player_image: 'https://apiv3.apifootball.com/badges/players/15486_v-van-dijk.jpg',
  },
  {
    player_id: '3',
    player_name: 'Messi',
    player_image: 'https://apiv3.apifootball.com/badges/players/2127_l-messi.jpg',
  },
  {
    player_id: '4',
    player_name: 'Ronaldo',
    player_image: 'https://apiv3.apifootball.com/badges/players/52515_cristiano-ronaldo.jpg',
  },
  {
    player_id: '5',
    player_name: 'Neymar',
    player_image: 'https://apiv3.apifootball.com/badges/players/327_neymar.jpg',
  },
];

const TeamCreation = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('País');
  const [leagues, setLeagues] = useState<any[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<string>('Liga');
  const [teams, setTeams] = useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>('Equipo');
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newTeam, setNewTeam] = useState<Player[]>(equipoA);
  const [showPlayerSearch, setShowPlayerSearch] = useState<boolean>(false);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [teamName, setTeamName] = useState<string>('');
  const router = useRouter();

  const removePlayer = (playerId: string) => {
    setNewTeam((prevTeam) =>
      prevTeam.map((player) => (player.player_id === playerId ? { player_id: player.player_id } : player))
    );
  };

  const searchPlayer = (position: Position) => {
    setSelectedPosition(position);
    setShowPlayerSearch(true);
  };

  const addPlayer = (player: Player, position: Position) => {
    setNewTeam((prevTeam) => {
      const updatedTeam = prevTeam.map((p) =>
        p.player_id === position.player_id
          ? { ...p, player_name: player.player_name, player_image: player.player_image }
          : p
      );
      if (!updatedTeam.find((p) => p.player_id === position.player_id)) {
        updatedTeam.push({ ...player, player_id: position.player_id });
      }

      return updatedTeam;
    });
    setShowPlayerSearch(false);
  };

  const isTeamComplete = () => {
    return newTeam.every((player) => player.player_name);
  };

  const isFormValid = () => {
    return teamName.trim() !== '' && team?.team_badge !== undefined && isTeamComplete();
  };

  const countPlayersWithName = () => {
    return newTeam.filter((player) => player.player_name).length;
  };

  const saveTeamToLocal = (team: { name: string; badge: string; players: Player[] }) => {
    const existingTeams = JSON.parse(localStorage.getItem('teams') || '[]');
    existingTeams.push(team);
    localStorage.setItem('teams', JSON.stringify(existingTeams));
  };

  useEffect(() => {
    const element = document.getElementById('player-search-container');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedPosition, showPlayerSearch]);

  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
        setTeam(null);
      } catch (error) {
        setError('Error al cargar los países');
      } finally {
        setLoading(false);
      }
    };

    fetchCountriesData();
  }, []);

  useEffect(() => {
    const fetchCompetitionsData = async () => {
      if (selectedCountry !== 'País') {
        try {
          const data = await fetchCompetitions(selectedCountry);
          setLeagues(data);
          setTeams([]);
          setTeam(null);
        } catch (error) {
          setError('Error al cargar las competiciones');
        }
      } else {
        setLeagues([]);
        setTeams([]);
      }
    };

    fetchCompetitionsData();
  }, [selectedCountry]);

  useEffect(() => {
    const fetchTeamsData = async () => {
      if (selectedLeague !== 'Liga') {
        try {
          const data = await fetchTeams(selectedLeague);
          setTeams(data);
          setTeam(null);
        } catch (error) {
          setError('Error al cargar los equipos');
        }
      } else {
        setTeams([]);
      }
    };

    fetchTeamsData();
  }, [selectedLeague]);

  useEffect(() => {
    const fetchTeamData = async () => {
      if (selectedTeam !== 'Equipo') {
        try {
          const data = await fetchTeam(selectedTeam);
          setTeam(data);
        } catch (error) {
          setError('Error al cargar los jugadores');
        }
      } else {
        return;
      }
    };

    fetchTeamData();
  }, [selectedTeam]);

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setter(event.target.value);
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTeamData = {
      name: teamName,
      badge: team?.team_badge || '',
      players: newTeam,
    };

    saveTeamToLocal(newTeamData);
    setTeamName('');
    setNewTeam(equipoA);

    router.push('/myteams');
  };

  return (
    <div className="rounded-xl shadow-xl glass-effect-card">
      <div className="flex flex-col lg:flex-row p-8 gap-8 ">
        <aside className="relative flex-1 bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">Crear Equipo </h2>
          <div className="absolute top-0 right-10 flex items-center mt-4">
            <ImageWithFallback
              src={team?.team_badge || ''}
              alt={`${team?.team_name} badge`}
              fallbackSrc="badge"
              width={80}
              height={80}
            />
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="teamName" className="block text-xl font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                id="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full border border-gray-400 rounded-lg p-3 text-gray-800"
              />
            </div>
            <div>
              <label htmlFor="badge" className="block text-xl font-medium text-gray-700">
                Escudo
              </label>
              <div id="badge" className="flex justify-start items-center gap-2">
                <select
                  id="country"
                  value={selectedCountry}
                  onChange={handleChange(setSelectedCountry)}
                  className="w-full border border-gray-400 rounded-lg p-3 text-gray-800"
                >
                  <option value="País">País</option>
                  {countries.map((country) => (
                    <option key={country.country_id} value={country.country_id}>
                      {country.country_name}
                    </option>
                  ))}
                </select>

                <select
                  id="competition"
                  value={selectedLeague}
                  onChange={handleChange(setSelectedLeague)}
                  className="w-full border border-gray-400 rounded-lg p-3 text-gray-800"
                >
                  <option value="Liga">Liga</option>
                  {leagues.map((league) => (
                    <option key={league.league_id} value={league.league_id}>
                      {league.league_name}
                    </option>
                  ))}
                </select>

                <select
                  id="team"
                  value={selectedTeam}
                  onChange={handleChange(setSelectedTeam)}
                  className="w-full border border-gray-400 rounded-lg p-3 text-gray-800"
                >
                  <option value="Equipo">Equipo</option>
                  {teams.map((team) => (
                    <option key={team.team_key} value={team.team_key}>
                      {team.team_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
              disabled={!isFormValid()}
            >
              Crear
            </button>
          </form>
        </aside>
        <aside className="flex flex-col items-center justify-center h-96">
          <div className="flex flex-col justify-center items-center text-lg">
            <FootballPitch players={newTeam} onRemovePlayer={removePlayer} onSearchPlayer={searchPlayer} />
            {isTeamComplete() ? (
              <p className="text-center text-green-500 mt-4">¡Equipo completo!</p>
            ) : (
              <div className="text-center mt-4">
                <p className="text-white">Jugadores añadidos {countPlayersWithName()}/5</p>
              </div>
            )}
          </div>
        </aside>
      </div>
      <div>
        <p className="text-sm text-white mb-10 text-end pr-8">
          *Para crear un equipo debes añadir un nombre, un escudo y 5 jugadores
        </p>
      </div>

      {showPlayerSearch && <PlayerSearch position={selectedPosition} onAddPlayer={addPlayer} />}
    </div>
  );
};

export default TeamCreation;
