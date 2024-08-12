'use client';

import { useEffect, useState } from 'react';
import { Player } from '../components/FootballPitchEditable';
import NavBar from '../components/NavBar';
import TeamCard from '../components/TeamCard';
import EmptyCard from '../components/EmptyCard';

const MyTeams = () => {
  const [teams, setTeams] = useState<{ name: string; badge: string; players: Player[] }[]>([]);

  useEffect(() => {
    const savedTeams = JSON.parse(localStorage.getItem('teams') || '[]');
    setTeams(savedTeams);
  }, []);

  const handleRemoveTeam = (index: number) => {
    const updatedTeams = teams.filter((_, i) => i !== index);
    setTeams(updatedTeams);
    localStorage.setItem('teams', JSON.stringify(updatedTeams));
  };

  const firstTeam = teams[0];
  const secondTeam = teams[1];

  return (
    <section className="min-h-screen mt-32 mx-16">
      <NavBar />
      <div className="glass-effect-card p-8 rounded-xl shadow-xl min-w-[400px]">
        <h1 className="text-4xl mb-10">Mis equipos</h1>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 text-black">
          {firstTeam ? <TeamCard team={firstTeam} onRemove={() => handleRemoveTeam(0)} /> : <EmptyCard />}
          {secondTeam ? <TeamCard team={secondTeam} onRemove={() => handleRemoveTeam(1)} /> : <EmptyCard />}
        </div>
      </div>
    </section>
  );
};

export default MyTeams;
