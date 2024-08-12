import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL as string;
const API_KEY = process.env.API_KEY as string;

export async function GET(request: NextRequest) {
  try {
    // Obtener countryId desde los parámetros de consulta de la solicitud
    const url = new URL(request.url);
    const countryId = url.searchParams.get('country_id');

    if (!countryId) {
      return NextResponse.json({ error: 'Falta el parámetro country_id' }, { status: 400 });
    }

    const response = await fetch(`${API_URL}?action=get_leagues&country_id=${countryId}&APIkey=${API_KEY}`);

    if (!response.ok) {
      throw new Error('Error en la solicitud a la API externa');
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
    return NextResponse.json({ error: 'Error al realizar la solicitud' }, { status: 500 });
  }
}
