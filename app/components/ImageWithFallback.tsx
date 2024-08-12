'use client';

import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

const defaultPlayerImage = '/default-player.jpg';
const defaultBadgeImage = '/default-badge.png';

type ImageWithFallbackProps = ImageProps & {
  fallbackSrc?: 'player' | 'badge';
};

const ImageWithFallback = ({ src, alt = '', fallbackSrc = 'player', ...props }: ImageWithFallbackProps) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  const getFallbackSrc = () => {
    if (fallbackSrc === 'badge') return defaultBadgeImage;
    return defaultPlayerImage;
  };

  return <Image alt={alt} onError={() => setError(true)} src={error ? getFallbackSrc() : src} {...props} />;
};

export default ImageWithFallback;
