'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Modal, ModalContent, ModalBody, useDisclosure } from '@nextui-org/react';

interface InArticleVideoShowcaseModalProps {
  videoSrc: string;
  buttonText?: string;
  className?: string;
}

const InArticleVideoShowcaseModal: React.FC<InArticleVideoShowcaseModalProps> = ({ 
  videoSrc, 
  buttonText = "Watch Video Showcase", 
  className = "" 
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className={`text-center text-sm text-signoz_vanilla-400 flex items-center gap-4 mb-4 ${className}`}>
      <div className="flex-1 border-t border-dashed border-gray-500"></div>
      <div>
        <button onClick={onOpen} className="text-signoz_robin-300 hover:text-signoz_robin-400">
          {buttonText} <ArrowUpRight size={16} className="inline" />
        </button>
      </div>
      <div className="flex-1 border-t border-dashed border-gray-500"></div>

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
              <video autoPlay controls className="w-full">
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