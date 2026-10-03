'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

function ResilientImage({ src, alt, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);
  return <Image {...props} src={failed ? '/brand/image-unavailable.svg' : src} alt={failed ? `Imagem indisponível: ${alt}` : alt} unoptimized={failed || props.unoptimized} onError={() => { if (!failed) setFailed(true); }} />;
}

export function NewsImage(props: ImageProps) {
  return <ResilientImage key={typeof props.src === 'string' ? props.src : props.src.toString()} {...props} />;
}
