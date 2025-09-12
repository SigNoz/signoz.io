"use client"
import Image from "next/image";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// Auto carousel responsive
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const AutoCarousel = ({ images }: { images: { src: string; alt: string }[] }) => {
  return (
    <div className="w-full h-80 rounded-lg">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        showDots={false}
        arrows={false}
        className="h-full"
      >
        {images.map((image, index) => (
          <div key={index} className="w-full">
            <Image
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              width={1000}
              height={1000}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default AutoCarousel;