'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import TeamCreation from '../../components/TeamCreation';
import NavBar from '@/app/components/NavBar';

const Edit = () => {
  const { id } = useParams();
  const [team, setTeam] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const savedTeams = JSON.parse(localStorage.getItem('teams') || '[]');
      const currentTeam = savedTeams.find((team: { id: string }) => team.id === id);

      if (currentTeam) {
        setTeam(currentTeam);
      } else {
        console.error('Team not found');
      }
    }
  }, [id]);

  return (
    <section className="min-h-screen mt-36 mb-16 md:mx-16">
      <NavBar />
      <div className="glass-effect-card p-8 rounded-xl shadow-xl min-w-[400px]">
        {!team ? (
          <p>No encontramos tu equipo :(</p>
        ) : (
          <>
            <h2 className="text-4xl mb-10">Editar Equipo</h2>
            <TeamCreation team={team} />
          </>
        )}
      </div>
    </section>
  );
};

export default Edit;
