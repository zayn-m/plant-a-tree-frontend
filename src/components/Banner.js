import { Carousel } from "bootstrap";
import React from "react";

import Banner1 from '../assets/banner1.jpeg';

export default function Banner() {
  return (
      <div className="banner">
        <img
          className="d-block w-100"
          src={Banner1}
          alt="First slide"
        />
        </div>
  );
}
