'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  // Estado para manejar la visibilidad del párrafo
  const [isHovered, setIsHovered] = useState(false);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between p-24 bg-cover bg-center bg-no-repeat">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/argentinaintro.jpg')", filter: 'blur(4px)' }}
      ></div>
      <div className="relative flex flex-col items-center gap-10 ">
        <h1 className="text-4xl">¡Bienvenido a Dream Match App!</h1>
        <Link href={'/myteams'}>
          <div
            className="relative h-60 w-60 glass-effect rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Image src="/logo.webp" height={100} width={100} alt="logo" />
          </div>
        </Link>
        <p className={`text-3xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          ¡Crea el partido de tus sueños!
        </p>
      </div>
    </main>
  );
}
