import { useState } from 'react';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

export interface Player {
  player_id: string;
  player_name?: string;
  player_image?: string;
}

export interface Position {
  player_id: string;
  top: string;
  left: string;
}

interface FootballPitchEditableProps {
  players: Player[];
  onRemovePlayer: (playerId: string) => void;
  onSearchPlayer: (position: Position) => void;
}

const FootballPitchEditable: React.FC<FootballPitchEditableProps> = ({
  players,
  onRemovePlayer,
  onSearchPlayer,
}) => {
  const [hoveredPlayer, setHoveredPlayer] = useState<string | null>(null);

  const positions: Position[] = [
    { player_id: '1', top: '87%', left: '50%' },
    { player_id: '2', top: '60%', left: '50%' },
    { player_id: '3', top: '40%', left: '70%' },
    { player_id: '4', top: '40%', left: '30%' },
    { player_id: '5', top: '27%', left: '50%' },
  ];

  return (
    <div className="relative">
      <Image src={'/half-pitch.png'} alt="half-soccer-pitch" width={400} height={350} layout="responsive" />
      {positions.map((position) => {
        const player = players.find((p) => p.player_id === position.player_id);

        return (
          <div
            key={position.player_id}
            className="absolute flex flex-col items-center"
            style={{ top: position.top, left: position.left, transform: 'translate(-50%, -50%)' }}
            onClick={() =>
              player?.player_name ? onRemovePlayer(player.player_id) : onSearchPlayer(position)
            }
            onMouseEnter={() => setHoveredPlayer(position.player_id)}
            onMouseLeave={() => setHoveredPlayer(null)}
          >
            <div className="relative">
              {player?.player_name ? (
                <div className="relative">
                  <ImageWithFallback
                    src={player.player_image || '/default-player.png'}
                    alt={player.player_name || ''}
                    width={40}
                    height={40}
                    className="rounded-full border"
                  />
                  {hoveredPlayer === position.player_id && (
                    <div className="absolute top-0 right-0">
                      <Trash2
                        className="p-2 text-white bg-red-600 rounded-full cursor-pointer  transform transition-transform duration-300 hover:scale-110"
                        width={40}
                        height={40}
                        onClick={() => onRemovePlayer(player.player_id)}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full border border-white cursor-pointer transform transition-transform duration-300 hover:scale-110">
                  <span className="text-xl text-gray-700">+</span>
                </div>
              )}
            </div>
            <p className="text-center text-black">{player?.player_name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FootballPitchEditable;
