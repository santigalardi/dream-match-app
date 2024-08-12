import Image from 'next/image';
import Link from 'next/link';

const NavBar = () => {
  return (
    <header className="absolute top-0 left-0 w-full flex items-center justify-between p-6 px-16 bg-transparent z-10 uppercase font-bold">
      <div>
        <Link href="/myteams">
          <Image src="/logo.webp" alt="Dream Match App Logo" width={45} height={45} />
        </Link>
      </div>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link href="/myteams" className="text-lg text-shadow">
              Mis equipos
            </Link>
          </li>
          <li>
            <Link href="/create" className="text-lg text-shadow">
              Crear Equipo
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
