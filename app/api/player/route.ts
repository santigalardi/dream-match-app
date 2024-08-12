import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL as string;
const API_KEY = process.env.API_KEY as string;

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const playerId = url.searchParams.get('player_id');
    const playerName = url.searchParams.get('player_name');

    // Check if player_id is provided
    if (playerId) {
      const response = await fetch(`${API_URL}?action=get_players&player_id=${playerId}&APIkey=${API_KEY}`);
      if (!response.ok) {
        throw new Error('Error en la solicitud a la API externa');
      }
      const data = await response.json();
      return NextResponse.json([data[0]]);
    }

    // Check if player_name is provided
    if (playerName) {
      const response = await fetch(
        `${API_URL}?action=get_players&player_name=${playerName}&APIkey=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error('Error en la solicitud a la API externa');
      }
      let data = await response.json();

      if (data.error) {
        return NextResponse.json(null);
      }

      return NextResponse.json(data);
    }

    // If neither parameter is provided
    return NextResponse.json({ error: 'Falta el parámetro player_id o player_name' }, { status: 400 });
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
    return NextResponse.json({ error: 'Error al realizar la solicitud' }, { status: 500 });
  }
}
