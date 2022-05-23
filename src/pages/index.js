import React from 'react'
import { graphql } from 'gatsby'
import Header from '../components/Header';
import Footer from '../components/Footer';
import PhotoSlider from '../components/slider/PhotoSlider'
import * as styles from "../styles/index.module.scss";
const Index = ({ data }) => {
  const { width, image_height, slider_height } = styles;

  return (
    <>
      <Header />
      <PhotoSlider />

      {/* <StaticImage src="../images/slider/slider03.jpg" width={600} alt="test" /> */}
      <Footer />
      {/* <Layout/> */}
      {/* <p>{title}:{description}</p> */}
    </>
  )
}
export default Index;
export const query = graphql`query QuerySlider {
  allFile(
    filter: {sourceInstanceName: {eq: "images"}, relativeDirectory: {eq: "slider"}}
  ) {
    nodes {
      relativePath
      relativeDirectory
    }
  }
}`


