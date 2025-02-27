'use client';

import React from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { Modal, ModalContent, ModalBody, useDisclosure } from '@nextui-org/react';
import Button from '../Button/Button';
import YouTube from '../VideoPlayer/VideoPlayer';

// Example usage with YouTube:
// <InArticleVideoShowcaseModal
//   youtubeId="oQdjfhzz5oQ"
//   title="SigNoz Video"
//   subtitle="Learn more about SigNoz"
//   oneLiner="Watch this video to learn more about SigNoz"
//   ctaText="Visit Website"
//   ctaUrl="https://signoz.io"
// />
//
// Example usage with direct video source:
// <InArticleVideoShowcaseModal
//   videoSrc="https://example.com/video.mp4"
//   title="Product Demo"
//   subtitle="See our product in action"
//   thumbnailSrc="/custom-thumbnail.jpg"
//   oneLiner="A quick overview of key features"
//   ctaText="Try Now"
//   ctaUrl="/signup"
// />

interface InArticleVideoShowcaseModalProps {
  videoSrc?: string;
  youtubeId?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  thumbnailSrc?: string;
  oneLiner?: string;
  ctaText?: string;
  ctaUrl?: string;
}

const InArticleVideoShowcaseModal: React.FC<InArticleVideoShowcaseModalProps> = ({ 
  videoSrc, 
  youtubeId,
  className = "",
  title,
  subtitle,
  thumbnailSrc,
  oneLiner,
  ctaText,
  ctaUrl
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Validate that either videoSrc or youtubeId is provided, but not both
  if (process.env.NODE_ENV === 'development') {
    if (!videoSrc && !youtubeId) {
      console.warn('Either videoSrc or youtubeId must be provided to InArticleVideoShowcaseModal');
    }
    if (videoSrc && youtubeId) {
      console.warn('Only one of videoSrc or youtubeId should be provided to InArticleVideoShowcaseModal');
    }
  }

  // If no thumbnail is provided for YouTube videos, use the default YouTube thumbnail
  const effectiveThumbnailSrc = thumbnailSrc || (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : undefined);

  return (
    <div className={`${className}`}>
      {/* Video Thumbnail with Play Button */}
      <div className="relative group cursor-pointer" onClick={onOpen}>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300 rounded-lg" />
        
        {/* Thumbnail Image */}
        <img 
          src={effectiveThumbnailSrc}
          alt={title || "Video thumbnail"}
          className="w-full rounded-lg"
        />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 md:w-20 md:h-20 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Play size={24} className="text-white ml-1 md:size-40" />
          </div>
        </div>

        {/* Title and Subtitle Overlay */}
        <div className="absolute bottom-0 left-0 p-3 md:p-6 w-full bg-gradient-to-t from-black/80 to-transparent">
          {title && (
            <h2 className="text-lg md:text-3xl font-bold text-white mb-1 md:mb-2">{title}</h2>
          )}
          {subtitle && (
            <p className="text-sm hidden md:block md:text-lg text-gray-300">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        size={'5xl'}
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="self-center mx-2 md:mx-0"
      >
        <ModalContent className="bg-transparent">
          {() => (
            <ModalBody className="py-3 md:py-6">
              {youtubeId ? (
                <YouTube id={youtubeId} />
              ) : (
                <video autoPlay controls className="w-full rounded-lg shadow-2xl">
                  <source src={videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              {oneLiner && (
                <p className="text-center text-signoz_vanilla-400 mt-2 md:mt-4 mb-0 text-sm md:text-base">
                  {oneLiner}
                </p>
              )}
              {ctaText && ctaUrl && (
                <div className="flex justify-center">
                  <Button
                    onClick={() => {
                      onOpenChange();
                      window.open(ctaUrl, '_blank');
                    }}
                  >
                    <span className="flex items-center gap-2">
                      {ctaText}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Button>
                </div>
              )}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default InArticleVideoShowcaseModal;