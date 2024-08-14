'use client';

import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import TeamCreation from '../components/TeamCreation';
import { useRouter } from 'next/navigation';

const Create = () => {
  const [teams, setTeams] = useState<{ id: string; name: string; badge: string; players: any[] }[]>([]);
  const [isMaxTeamsReached, setIsMaxTeamsReached] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedTeams = JSON.parse(localStorage.getItem('teams') || '[]');
    setTeams(savedTeams);

    if (savedTeams.length >= 2) {
      setIsMaxTeamsReached(true);
    }
  }, []);

  return (
    <section className="min-h-screen mt-36 mb-16 md:mx-16">
      <NavBar />
      {isMaxTeamsReached ? (
        <div className="rounded-xl shadow-xl text-center text-xl font-semibold glass-effect-card min-h-[200px] flex flex-col justify-center items-center gap-8">
          <p>
            Se ha alcanzado el límite máximo de dos equipos. Elimine un equipo existente para crear uno nuevo.
          </p>
          <button
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:bg-green-600 transform hover:scale-105"
            onClick={() => {
              router.push('/myteams');
            }}
          >
            Volver
          </button>
        </div>
      ) : (
        <div className="glass-effect-card p-8 rounded-xl shadow-xl min-w-[400px]">
          <h2 className="text-4xl mb-10">Crear Equipo </h2>
          <TeamCreation />
        </div>
      )}
    </section>
  );
};

export default Create;
