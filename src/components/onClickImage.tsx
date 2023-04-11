import React from "react";
import "react-medium-image-zoom/dist/styles.css";
import Zoom from "react-medium-image-zoom";

const onClickImage = ({ image, alt }): JSX.Element => (
  <Zoom zoomMargin={100}>
    <img src={image} alt={alt} />
  </Zoom>
);

export default onClickImage;
