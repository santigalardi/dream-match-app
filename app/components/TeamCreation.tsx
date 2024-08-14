'use client';

import { FormEvent, useEffect, useState } from 'react';
import { fetchCompetitions, fetchCountries, fetchTeam, fetchTeams } from '../utils/searchPlayer';
import ImageWithFallback from './ImageWithFallback';
import { Player, Position } from './FootballPitchEditable';
import PlayerSearch from './PlayerSearch';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { myTeam } from '../utils/defaultTeamSchema';
import FootballPitchEditable from './FootballPitchEditable';

interface Team {
  id: string;
  name: string;
  badge: string;
  players: Player[];
}

interface TeamCreationProps {
  id?: string;
  team?: Team;
}

const TeamCreation = ({ team }: TeamCreationProps) => {
  const [countries, setCountries] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('País');
  const [leagues, setLeagues] = useState<any[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<string>('Liga');
  const [teams, setTeams] = useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>('Equipo');
  const [teamBadge, setTeamBadge] = useState<string | null>(team?.badge || null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newTeam, setNewTeam] = useState<Player[]>(team?.players || myTeam);
  const [showPlayerSearch, setShowPlayerSearch] = useState<boolean>(false);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [teamName, setTeamName] = useState<string>(team?.name || '');
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

  const addPlayer = (newPlayer: Player, position: Position) => {
    // Verificar si el jugador ya está en otro equipo
    const getAllPlayersFromSavedTeams = (excludeTeamId?: string): Player[] => {
      const savedTeams = JSON.parse(localStorage.getItem('teams') || '[]');
      // Filtrar equipos para excluir el equipo que se está editando
      if (excludeTeamId) {
        const filteredTeams = savedTeams.filter((team: { id: string }) => team.id !== excludeTeamId);
        const allPlayers = filteredTeams.flatMap((team: { players: Player[] }) => team.players);
        return allPlayers;
      } else {
        const allPlayers = savedTeams.flatMap((team: { players: Player[] }) => team.players);
        return allPlayers;
      }
    };

    const existingPlayers = getAllPlayersFromSavedTeams(team?.id);
    const isPlayerDuplicate = existingPlayers.some((player) => player.player_name === newPlayer.player_name);

    if (isPlayerDuplicate) {
      toast.error('Este jugador ya está en otro equipo.');
      return;
    }

    // Verificar si el jugador ya está en el equipo actual
    const isPlayerInTeam = newTeam.some((player) => player.player_name === newPlayer.player_name);

    if (isPlayerInTeam) {
      toast.error('Este jugador ya está en tu equipo.');
      return;
    }

    // Agregar el nuevo jugador al equipo
    setNewTeam((prevTeam) => {
      const updatedTeam = prevTeam.map((p) =>
        p.player_id === position.player_id
          ? { ...p, player_name: newPlayer.player_name, player_image: newPlayer.player_image }
          : p
      );
      if (!updatedTeam.find((p) => p.player_id === position.player_id)) {
        updatedTeam.push({ ...newPlayer, player_id: position.player_id });
      }

      return updatedTeam;
    });
    setShowPlayerSearch(false);
  };

  const isTeamComplete = () => {
    return newTeam.every((player) => player.player_name);
  };

  const isFormValid = () => {
    return teamName.trim() !== '' && teamBadge !== undefined && isTeamComplete();
  };

  const countPlayersWithName = () => {
    return newTeam.filter((player) => player.player_name).length;
  };

  const saveTeamToLocal = (newTeamData: { id: string; name: string; badge: string; players: Player[] }) => {
    const existingTeams = JSON.parse(localStorage.getItem('teams') || '[]');
    const updatedTeams = existingTeams.filter((team: Team) => team.id !== newTeamData.id);
    updatedTeams.push(newTeamData);
    localStorage.setItem('teams', JSON.stringify(updatedTeams));
  };

  const updateTeamInLocal = (teamData: Team) => {
    const teams = JSON.parse(localStorage.getItem('teams') || '[]');
    const updatedTeams = teams.map((team: Team) => (team.id === teamData.id ? teamData : team));
    localStorage.setItem('teams', JSON.stringify(updatedTeams));
  };

  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
      } catch (error) {
        setError('Error al cargar los países');
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
          setTeamBadge(null);
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
          setTeamBadge(null);
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
          setTeamBadge(data.team_badge);
        } catch (error) {
          setError('Error al cargar los jugadores');
        }
      } else {
        return;
      }
    };

    fetchTeamData();
  }, [selectedTeam]);

  useEffect(() => {
    const element = document.getElementById('player-search-container');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedPosition, showPlayerSearch]);

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setter(event.target.value);
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTeamData = {
      id: team?.id || crypto.randomUUID(),
      name: teamName,
      badge: teamBadge || '',
      players: newTeam,
    };

    if (team?.id) {
      updateTeamInLocal(newTeamData);
    } else {
      saveTeamToLocal(newTeamData);
    }

    setTeamName('');
    setNewTeam(myTeam);

    router.push('/myteams');
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="relative md:flex-1 bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-center mt-4">
            <ImageWithFallback
              src={teamBadge || ''}
              alt={`badge`}
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
                data-testid="team-name-input"
                required
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
                  data-testid="teamSelect"
                  required
                >
                  <option value="Equipo">Equipo</option>
                  {teams.map((team) => (
                    <option key={team.team_key} data-testid="teamOption" value={team.team_key}>
                      {team.team_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400"
              disabled={!isFormValid()}
            >
              {team?.id ? 'Guardar' : 'Crear'}
            </button>
            <p className="text-sm text-black mb-10">
              *Para crear un equipo debes añadir un nombre, un escudo y 5 jugadores
            </p>
          </form>
        </div>
        <div className="flex flex-col items-center justify-center">
          <FootballPitchEditable
            players={newTeam}
            onRemovePlayer={removePlayer}
            onSearchPlayer={searchPlayer}
          />
          {isTeamComplete() ? (
            <p className="text-green-500 text-center pt-16">¡Equipo completo!</p>
          ) : (
            <p className="text-white text-center pt-16">Jugadores añadidos {countPlayersWithName()}/5</p>
          )}
        </div>
      </div>
      <div></div>

      {showPlayerSearch && <PlayerSearch position={selectedPosition} onAddPlayer={addPlayer} />}
    </div>
  );
};

export default TeamCreation;
