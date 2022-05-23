import React from 'react'
import NextArrow from './NextArrow'
import PreArrow from './NextArrow'
import { StaticImage } from "gatsby-plugin-image"
import Slider from "react-slick";
import * as styles from "./slider.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const PhotoSlider = () => {
  const { image_height, photo_slider } = styles;
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PreArrow />,
    appendDots: dots => (
      <div>
        <ul style={{ backgroundColor: "rgba(255,255,255,0.2)" }}> {dots} </ul>
      </div>
    ),
  };
  return (
    <div className={photo_slider}>
      <Slider {...settings} >
        <div >
          <StaticImage className={image_height} src="../../images/slider/slider01.jpg" alt="slider" />
        </div>
        <div >
          <StaticImage className={image_height} src="../../images/slider/slider02.jpg" alt="slider" />
        </div>
        <div >
          <StaticImage className={image_height} src="../../images/slider/slider03.jpg" alt="slider" />
        </div>
      </Slider>
    </div>
  )
}

export default PhotoSlider