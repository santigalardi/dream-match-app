'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { KonamiCode } from '../utils/konamiCode';
import { Player } from '../components/FootballPitchEditable';
import NavBar from '../components/NavBar';
import TeamCard from '../components/TeamCard';
import EmptyCard from '../components/EmptyCard';
import Konami from '../components/Konami';

const MyTeams = () => {
  const [teams, setTeams] = useState<{ id: string; name: string; badge: string; players: Player[] }[]>([]);
  const [konami, setKonami] = useState(false);
  const router = useRouter();

  const handleRemoveTeam = (teamId: string) => {
    const updatedTeams = teams.filter((team) => team.id !== teamId);
    setTeams(updatedTeams);
    localStorage.setItem('teams', JSON.stringify(updatedTeams));
  };

  const handleEditTeam = (teamId: string) => {
    router.push(`/edit/${teamId}`);
  };

  const firstTeam = teams[0];
  const secondTeam = teams[1];

  useEffect(() => {
    const savedTeams = JSON.parse(localStorage.getItem('teams') || '[]');
    setTeams(savedTeams);
  }, []);

  useEffect(() => {
    const konami = new KonamiCode(() => {
      setKonami(true);
    });
  }, []);

  useEffect(() => {
    const element = document.getElementById('konami');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [konami]);

  return (
    <section className="min-h-screen mt-36 mb-16 md:mx-16">
      <NavBar />
      <div className="glass-effect-card p-8 rounded-xl shadow-xl min-w-[400px]">
        <h2 className="text-4xl mb-10">Mis equipos</h2>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 text-black">
          {firstTeam ? (
            <TeamCard
              team={firstTeam}
              onEdit={() => handleEditTeam(firstTeam.id)}
              onRemove={() => handleRemoveTeam(firstTeam.id)}
            />
          ) : (
            <EmptyCard />
          )}
          {secondTeam ? (
            <TeamCard
              team={secondTeam}
              onEdit={() => handleEditTeam(secondTeam.id)}
              onRemove={() => handleRemoveTeam(secondTeam.id)}
            />
          ) : (
            <EmptyCard />
          )}
        </div>
      </div>
      {konami && <Konami />}
    </section>
  );
};

export default MyTeams;
