'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../Button/Button';
import Figure from '../Figure/Figure';

interface ImageCTAProps {
  src: string;
  alt: string;
  className?: string;
  ctaText?: string;
  ctaUrl?: string;
  caption: string;
}

const ImageCTA: React.FC<ImageCTAProps> = ({
  src,
  alt,
  className = "",
  ctaText,
  ctaUrl,
  caption
}) => {
  return (
    <div className={`${className} relative group`}>
      <Figure
        src={src}
        alt={alt}
        caption={caption}
      />
      
      {/* Hover Overlay with CTA */}
      {ctaText && ctaUrl && (
        <div className="absolute bottom-12 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            onClick={() => window.open(ctaUrl, '_blank')}
            size="sm"
            className="shadow-lg"
          >
            <span className="flex items-center gap-2">
              {ctaText}
              <ArrowRight className="h-4 w-4" />
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageCTA;
