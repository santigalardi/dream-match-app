import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL as string;
const API_KEY = process.env.API_KEY as string;

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const teamId = url.searchParams.get('team_id');

    if (!teamId) {
      return NextResponse.json({ error: 'Falta el parámetro team_id' }, { status: 400 });
    }

    const response = await fetch(`${API_URL}?action=get_teams&team_id=${teamId}&APIkey=${API_KEY}`);

    if (!response.ok) {
      throw new Error('Error en la solicitud a la API externa');
    }

    const data = await response.json();

    return NextResponse.json(data[0].players);
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
    return NextResponse.json({ error: 'Error al realizar la solicitud' }, { status: 500 });
  }
}
