export const fetchCountries = async () => {
  try {
    const response = await fetch('/api/countries');
    if (!response.ok) {
      throw new Error('Error al obtener los datos');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al cargar los datos', error);
    throw error;
  }
};

export const fetchCompetitions = async (countryId: string) => {
  try {
    const response = await fetch(`/api/competitions?country_id=${countryId}`);
    if (!response.ok) {
      throw new Error('Error al obtener los datos');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al cargar los datos', error);
    throw error;
  }
};

export const fetchTeams = async (leagueId: string) => {
  try {
    const response = await fetch(`/api/teams?league_id=${leagueId}`);
    if (!response.ok) {
      throw new Error('Error al obtener los datos');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al cargar los datos', error);
    throw error;
  }
};

export const fetchTeam = async (teamId: string) => {
  try {
    const response = await fetch(`/api/teams?team_id=${teamId}`);
    if (!response.ok) {
      throw new Error('Error al obtener los datos');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al cargar los datos', error);
    throw error;
  }
};

export const fetchPlayers = async (teamId: string) => {
  try {
    const response = await fetch(`/api/players?team_id=${teamId}`);
    if (!response.ok) {
      throw new Error('Error al obtener los datos');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al cargar los datos', error);
    throw error;
  }
};

export const fetchPlayerById = async (playerId: string) => {
  try {
    const response = await fetch(`/api/player?player_id=${playerId}`);
    if (!response.ok) {
      throw new Error('Error al obtener los datos');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al cargar los datos', error);
    throw error;
  }
};

export const fetchPlayerByName = async (playerName: string) => {
  try {
    const response = await fetch(`/api/player?player_name=${playerName}`);
    if (!response.ok) {
      throw new Error('Error al obtener los datos');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al cargar los datos', error);
    throw error;
  }
};
