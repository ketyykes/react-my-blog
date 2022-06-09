import React from 'react'
import { graphql } from 'gatsby'
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import PhotoSlider from '../components/slider/PhotoSlider'
import * as styles from "../styles/pages-styles/index.module.scss"
import PortfolioTab from '../components/portfolio/PortfolioTab';

const Index = ({ data }) => {
  return (
    <>
      <Header />
      <PhotoSlider />
      <PortfolioTab />
      <Footer />
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


