"use client"
import { useState, useEffect } from "react";
import Image from "next/image";

const AutoCarousel = ({ images }: { images: { src: string; alt: string }[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 2000); // Change image every 2 seconds
  
      return () => clearInterval(interval);
    }, [images.length]);
  
    return (
      <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              width={1000}
              height={400}
            />
          </div>
        ))}
      </div>
    );
  };

  export default AutoCarousel;