import React from 'react';

import CarouselComponent from '../components/CarouselComponent.jsx';
import picture from '../img/pic1.png';

export default function Home() {
  // place holder image is used at the moment.
  // note that alt is required for compiler to accept the img
  const pic = picture;

  return (
    <>
      <CarouselComponent />
      <div id="page-container">
        <img src={pic} alt="hi" />
      </div>
      <CarouselComponent />
    </>
  );
}
