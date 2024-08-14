import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const EmptyCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <div
      className="relative flex flex-col justify-center items-center rounded-xl shadow-lg min-h-[400px] border border-dashed border-white mb-10 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        router.push('/create');
      }}
      data-testid="empty-card"
    >
      <Plus className="text-white transition-transform duration-700 ease-in-out" width={60} height={60} />

      <div
        className={` transition-opacity duration-300 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      >
        <h2 className="text-2xl font-bold text-white">¡Crea un equipo!</h2>
      </div>
    </div>
  );
};

export default EmptyCard;
