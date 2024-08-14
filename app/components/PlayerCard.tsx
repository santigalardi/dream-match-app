import ImageWithFallback from './ImageWithFallback';

interface Player {
  player_id: string;
  player_name: string;
  player_image: string;
}

interface PlayerCardProps {
  player: Player;
  defaultImage?: string;
  onAddPlayer: (player: Player) => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, onAddPlayer }) => {
  return (
    <div className="relative w-52 bg-main-darkGold shadow-lg rounded-lg p-4 flex flex-col items-center gap-2 border border-gray-200 glass-effect-card transition-transform transform hover:scale-105 hover:shadow-xl group">
      <ImageWithFallback
        src={player.player_image}
        alt={`${player.player_name} image`}
        width={70}
        height={70}
        className="rounded-full"
      />
      <div>
        <h3 className="text-xl font-semibold text-white mb-8">{player.player_name}</h3>
      </div>
      <button
        className="absolute bottom-1 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-green-500 text-white rounded-lg hover:bg-green-600 px-4 py-2"
        onClick={() => onAddPlayer(player)}
      >
        Añadir
      </button>
    </div>
  );
};

export default PlayerCard;
