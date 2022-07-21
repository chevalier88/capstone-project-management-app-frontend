// import React from 'react';

// import CarouselComponent from '../components/CarouselComponent.jsx';
// import picture from '../img/pic1.png';

// export default function Home() {
//   // place holder image is used at the moment.
//   // note that alt is required for compiler to accept the img
//   const pic = picture;

//   return (
//     <>
//       <CarouselComponent />
//       <div id="page-container">
//         <img src={pic} alt="hi" />
//       </div>
//       <CarouselComponent />
//     </>
//   );
// }

import * as React from 'react';
import ProductCategories from '../components/Home/ProductCategories.jsx';
import ProductSmokingHero from '../components/Home/ProductSmokingHero.jsx';
// import AppFooter from '../components/Home/AppFooter.jsx';
import ProductHero from '../components/Home/ProductHero.jsx';
import ProductValues from '../components/Home/ProductValues.jsx';
import ProductHowItWorks from '../components/Home/ProductHowItWorks.jsx';
// import ProductCTA from '../components/Home/ProductCTA.jsx';
// import AppAppBar from '../components/Home/AppAppBar.jsx';

export default function Home() {
  return (
    <>
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <ProductHowItWorks />
      {/* <ProductCTA /> */}
      <ProductSmokingHero />
    </>
  );
}
