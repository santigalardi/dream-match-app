'use client';

import { FormEvent, useEffect, useState } from 'react';
import {
  fetchCompetitions,
  fetchCountries,
  fetchPlayerById,
  fetchPlayerByName,
  fetchPlayers,
  fetchTeams,
} from '../utils/searchPlayer';
import PlayerCard from './PlayerCard';
import { Player, Position } from './FootballPitchEditable';

interface PlayerSearchProps {
  position: Position | null;
  onAddPlayer: (player: Player, position: Position) => void;
}

const PlayerSearch: React.FC<PlayerSearchProps> = ({ position, onAddPlayer }) => {
  const [countries, setCountries] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('País');
  const [leagues, setLeagues] = useState<any[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<string>('Liga');
  const [teams, setTeams] = useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>('Equipo');
  const [players, setPlayers] = useState<any[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<string>('Jugador');
  const [playerList, setPlayerList] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
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
          setPlayerList(null);
        } catch (error) {
          setError('Error al cargar las competiciones');
        }
      } else {
        setLeagues([]);
        setTeams([]);
        setPlayers([]);
        setPlayerList(null);
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
          setPlayers([]);
          setPlayerList(null);
        } catch (error) {
          setError('Error al cargar los equipos');
        }
      } else {
        setTeams([]);
        setPlayers([]);
        setPlayerList(null);
      }
    };

    fetchTeamsData();
  }, [selectedLeague]);

  useEffect(() => {
    const fetchPlayersData = async () => {
      if (selectedTeam !== 'Equipo') {
        try {
          const data = await fetchPlayers(selectedTeam);
          setPlayers(data);
          setPlayerList(null);
        } catch (error) {
          setError('Error al cargar los jugadores');
        }
      } else {
        setPlayers([]);
        setPlayerList(null);
      }
    };

    fetchPlayersData();
  }, [selectedTeam]);

  useEffect(() => {
    const fetchPlayerData = async () => {
      if (selectedPlayer !== 'Jugador') {
        try {
          const data = await fetchPlayerById(selectedPlayer);
          setPlayerList(data);
        } catch (error) {
          setError('Error al cargar los datos del jugador');
        }
      } else {
        setPlayerList(null);
      }
    };

    fetchPlayerData();
  }, [selectedPlayer]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const playerName = formData.get('playerName') as string;

    if (!playerName) {
      return;
    }

    try {
      const data = await fetchPlayerByName(playerName);
      setPlayerList(data);
    } catch (error) {
      setError('Error al cargar los datos del jugador');
    }
    setLoading(false);
  };

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setter(event.target.value);
    };

  const handleAddPlayer = (player: Player) => {
    if (position) {
      onAddPlayer(player, position);
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div id="player-search-container" className="bg-gray-50 rounded-xl shadow-xl p-8">
      <div className="flex flex-col lg:flex-row mb-10">
        <form onSubmit={handleSubmit} className="w-full space-y-8 ">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Añadir jugador</h2>

            <div className="flex gap-2 items-center">
              <input
                name="playerName"
                className="border border-gray-400 rounded-lg p-3 text-gray-800 w-full"
                type="text"
                placeholder="Buscar por nombre"
              />
              <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2">
                Buscar
              </button>
            </div>
          </div>

          <div className="flex justify-start items-center gap-2">
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

            <select
              id="player"
              value={selectedPlayer}
              onChange={handleChange(setSelectedPlayer)}
              className="w-full border border-gray-400 rounded-lg p-3 text-gray-800"
            >
              <option value="Jugador">Jugador</option>
              {players.map((player) => (
                <option key={player.player_id} value={player.player_id}>
                  {player.player_name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : playerList ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {playerList.map((player, index) => (
            <div key={index} className="flex items-center justify-center">
              <PlayerCard player={player} onAddPlayer={handleAddPlayer} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-black">No se han encontrado jugadores</p>
      )}
    </div>
  );
};

export default PlayerSearch;
