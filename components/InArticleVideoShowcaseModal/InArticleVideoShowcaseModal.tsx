'use client';

import React from 'react';
import { Play } from 'lucide-react';
import { Modal, ModalContent, ModalBody, useDisclosure } from '@nextui-org/react';

interface InArticleVideoShowcaseModalProps {
  videoSrc: string;
  className?: string;
  title?: string;
  subtitle?: string;
  thumbnailSrc?: string;
}

const InArticleVideoShowcaseModal: React.FC<InArticleVideoShowcaseModalProps> = ({ 
  videoSrc, 
  className = "",
  title,
  subtitle,
  thumbnailSrc
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className={`${className}`}>
      {/* Video Thumbnail with Play Button */}
      <div className="relative group cursor-pointer" onClick={onOpen}>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300 rounded-lg" />
        
        {/* Thumbnail Image */}
        <img 
          src={thumbnailSrc}
          alt={title || "Video thumbnail"}
          className="w-full rounded-lg"
        />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Play size={40} className="text-white ml-1" />
          </div>
        </div>

        {/* Title and Subtitle Overlay */}
        <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-black/80 to-transparent">
          {title && (
            <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
          )}
          {subtitle && (
            <p className="text-lg text-gray-300">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        size={'5xl'}
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="self-center"
      >
        <ModalContent className="bg-transparent">
          {() => (
            <ModalBody className="py-6">
              <video autoPlay controls className="w-full rounded-lg shadow-2xl">
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default InArticleVideoShowcaseModal;