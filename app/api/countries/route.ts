import { NextResponse } from 'next/server';

const API_URL = process.env.API_URL as string;
const API_KEY = process.env.API_KEY as string;

export async function GET() {
  try {
    const response = await fetch(`${API_URL}?action=get_countries&APIkey=${API_KEY}`);

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
