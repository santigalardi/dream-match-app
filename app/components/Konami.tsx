'use client';

import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const Konami = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      id="konami"
      className={`flex h-[80vh] md:min-h-screen justify-center items-center glass-effect-card bg-black mt-10 rounded-xl shadow-xl`}
    >
      <ReactPlayer
        url="https://www.youtube.com/watch?v=F19URwLdlV4"
        playing={true}
        controls
        width={isLargeScreen ? '90%' : '640px'}
        height={isLargeScreen ? '90%' : '360px'}
      />
    </div>
  );
};

export default Konami;
