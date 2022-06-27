import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../card-style.css';

// eslint-disable-next-line
const {
  imgsrc,
  title,
  link,
  text,
  name,
  description,
} = this.props;

// eslint-disable-next-line
const CardUI = (props) => (
  <div className="card text-center">
    <div className="overflow">
      <img src={imgsrc} alt="image1" />
    </div>
    <div className="card=body text-dark">
      <h4 className="card-title">{title}</h4>
      <p className="card-text text-secondary">
        {name}
      </p>
      <p className="card-text text-secondary">
        {description}
      </p>
      <p className="card-text text-secondary">
        {text}
      </p>
      <a href="google.com" className="btn btn-outline-success">{link}</a>
    </div>
  </div>
);

export default CardUI;
