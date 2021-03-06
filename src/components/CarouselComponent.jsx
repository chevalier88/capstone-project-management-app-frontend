import React from 'react';
import Carousel from 'react-elastic-carousel';
import Item from './Item.jsx';

// component Reference:
// https://codesandbox.io/s/21o46mkwnr?file=/src/index.js
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

// let data = {};

// data = {
//   items: [
//     { id: 1, url: 'https://miro.medium.com/max/5000/1*tqlsrfxiy0owv8VEDmPK8A.jpeg', title: 'item #1' },
//     { id: 2, url: 'image2', title: 'item #2' },
//     { id: 3, url: 'image3', title: 'item #3' },
//   ],
// };

// const { items } = data;

//  <Carousel itemsToShow={1}>
//       {data.photoPath.map((image) => {
//           return <item><img src={require(`assets/img/${image}`)} alt="phone" /></item>}
//       </Carousel>

// 1. loop
// 2. fn
// 3. create render fn
// fn to retrive obj e.g {Render(getCarouselitems ())}
// getCarouselitem = get items
// Render create render jsx

export default function CarouselComponent() {
  const imgURL = 'https://miro.medium.com/max/5000/1*tqlsrfxiy0owv8VEDmPK8A.jpeg';
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>react-elastic-cou</h1>
      <div className="App">
        <Carousel breakPoints={breakPoints} itemsToShow={1}>
          <Item><img src={imgURL} alt="alt" /></Item>
          <Item>Two</Item>
          <Item>Three</Item>
          <Item>Four</Item>
          <Item>Five</Item>
          <Item>Six</Item>
          <Item>Seven</Item>
          <Item>Eight</Item>
          {/* <Item>{items.map((item) => <div key={item.id}>{item.title}</div>)}</Item>
          <Item>{items.map((item) => <img src={item.url} alt="alt" />)}</Item> */}
        </Carousel>
      </div>
    </>
  );
}
