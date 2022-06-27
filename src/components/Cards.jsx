import { React, Component } from 'react';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import CardUI from './CardUI.jsx';

const img1 = 'google.com';
const img2 = 'google.com';
const img3 = 'google.com';

// eslint-disable-next-line
class CardsCOMPONENT extends Component {
  render() {
    return (
      <div className="container-fluid d-flex justify-content-center">
        <div className="row">
          <div className="col-md-4" />
          <CardUI imgsrc={img1} title="Console" />
          <div className="col-md-4" title="Text" />
          <CardUI imgsrc={img2} />
          <div className="col-md-4" />
          <CardUI imgsrc={img3} />
        </div>
      </div>
    );
  }}

export default CardsCOMPONENT;
