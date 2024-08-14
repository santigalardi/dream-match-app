import { useState } from 'react';
import Image from 'next/image';
import { Player } from './FootballPitchEditable';
import FootballPitch from './FootballPitch';
import { Trash2, Edit } from 'lucide-react';

interface TeamCardProps {
  team: {
    id: string;
    name: string;
    badge: string;
    players: Player[];
  };
  onRemove: () => void;
  onEdit: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onRemove, onEdit }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative bg-gradient-to-b from-white to-green-600 rounded-xl shadow-lg px-4 py-12 mb-10 transition-transform duration-300 ease-in-out ${
        isHovered ? 'scale-105' : 'scale-100'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {}}
      data-testid="team-card"
    >
      <div className="flex justify-between items-center px-8">
        <h2 className="text-2xl font-bold">{team.name}</h2>
        <Image src={team.badge} alt={`${team.name} badge`} width={80} height={80} />
      </div>

      <div className="mt-4">
        <FootballPitch players={team.players} />
      </div>

      <div
        className={`absolute top-4 left-10 flex gap-2 transition-opacity duration-300 ease-in-out ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Edit
          className="px-2 text-white bg-blue-500 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-110"
          width={40}
          height={40}
          onClick={onEdit}
        />
        <Trash2
          className="px-2 text-white bg-red-500 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-110"
          width={40}
          height={40}
          onClick={onRemove}
        />
      </div>
    </div>
  );
};

export default TeamCard;
