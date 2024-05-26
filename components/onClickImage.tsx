// OnClickImage.tsx or OnClickImage.jsx
import React from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

interface ImageProps {
  image: string;
  alt: string;
}

const OnClickImage: React.FC<ImageProps> = ({ image, alt }) => (
  <Zoom>
    <img src={image} alt={alt} style={{ width: '100%', cursor: 'pointer' }} />
  </Zoom>
);

export default OnClickImage;
