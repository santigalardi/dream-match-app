import { useState } from 'react';
import Image from 'next/image';
import ImageWithFallback from './ImageWithFallback';
import { Player, Position } from './FootballPitchEditable';

interface FootballPitchProps {
  players: Player[];
}

const FootballPitch: React.FC<FootballPitchProps> = ({ players }) => {
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
      <Image
        src={'/half-pitch.png'}
        alt="half-soccer-pitch"
        width={1000}
        height={1000}
        layout="responsive"
        priority
      />
      {positions.map((position) => {
        const player = players.find((p) => p.player_id === position.player_id);

        return (
          <div
            key={position.player_id}
            className="absolute flex flex-col items-center"
            style={{ top: position.top, left: position.left, transform: 'translate(-50%, -50%)' }}
            onMouseEnter={() => setHoveredPlayer(position.player_id)}
            onMouseLeave={() => setHoveredPlayer(null)}
          >
            <div className="relative">
              {player && (
                <div className="relative">
                  <ImageWithFallback
                    src={player.player_image || '/default-player.png'}
                    alt={player.player_name || ''}
                    width={40}
                    height={40}
                    className="rounded-full border"
                  />
                </div>
              )}
            </div>
            <p className="text-center text-black">{player?.player_name || 'Vacío'}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FootballPitch;
