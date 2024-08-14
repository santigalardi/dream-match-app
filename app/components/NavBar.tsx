import Image from 'next/image';
import Link from 'next/link';

const NavBar = () => {
  return (
    <header
      className="absolute top-0 left-0 w-full flex items-center justify-between sm:justify-around mb-20 p-6 sm:px-32 min-w-[320px] bg-transparent z-10 uppercase font-bold"
      data-testid="nav-bar"
    >
      <Link href="/myteams">
        <div className="relative h-24 w-24 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:cursor-pointer">
          <Image
            src="/logo.webp"
            alt="Dream Match App Logo"
            style={{ width: '60%', height: 'auto' }}
            width={50}
            height={50}
            className="object-cover"
          />
        </div>
      </Link>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link
              href="/myteams"
              className="text-sm sm:text-lg text-shadow transition-all duration-300 hover:text-blue-500"
            >
              Mis equipos
            </Link>
          </li>
          <li>
            <Link
              href="/create"
              className="text-sm sm:text-lg text-shadow transition-all duration-300 hover:text-blue-500"
            >
              Crear Equipo
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
