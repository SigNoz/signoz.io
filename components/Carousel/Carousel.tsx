'use client'

import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import './Carousel.styles.css'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
}

export default function NextCarousel({ items }) {
  if (!items || (!Array.isArray(items) && items.length <= 0)) {
    return null
  }

  return (
    <div className="next-carousel">
      <Carousel responsive={responsive}>
        {items.map((item, index) => {
          return (
            <div className="carousel-image" key={index}>
              <img src={item} />
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}
