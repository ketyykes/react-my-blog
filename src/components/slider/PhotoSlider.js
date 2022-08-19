import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React , { useEffect ,useRef} from 'react'
import { StaticImage } from "gatsby-plugin-image"
import Slider from "react-slick";
import * as styles from "./photoSlider.module.scss";
import {init} from 'ityped';



const PhotoSlider = () => {
  const { image_height, photo_slider } = styles;
  const textRef = useRef();
  useEffect(() => {
    init(textRef.current,{
      showCurso:false, 
      strings: ["水土曜來了"],
      typeSpeed:500,
      backDelay: 500,
      backSpeed:100,
      cursorChar: "",
    })
    console.log(textRef);
  },[]);
  const settings = {
    arrows:false,
    dots: false,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed:5000,
    pauseOnHover: false,
  };
  return (
    <div className={photo_slider}>
      <Slider {...settings} >
          <StaticImage className={image_height} src="../../images/slider/slider01.jpg" alt="slider" />
          <StaticImage className={image_height} src="../../images/slider/slider02.jpg" alt="slider" />
          <StaticImage className={image_height} src="../../images/slider/slider03.jpg" alt="slider" />
      </Slider>
      <h1>歡迎來到<br/>
      <span ref={textRef}></span></h1>
    </div>
  )
}

export default PhotoSlider