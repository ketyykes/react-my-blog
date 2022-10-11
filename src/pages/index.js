import React from "react";
import { graphql } from "gatsby";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Seo from "../components/seo/Seo";
import PhotoSlider from "../components/slider/PhotoSlider";
import PortfolioTab from "../components/portfolio/PortfolioTab";

const Index = ({ data }) => {
  return (
    <>
      <Seo title="Home" />
      <Header />
      <PhotoSlider />
      <PortfolioTab />
      <Footer />
    </>
  );
};
export default Index;

export const query = graphql`
  query QuerySlider {
    allFile(
      filter: {
        sourceInstanceName: { eq: "images" }
        relativeDirectory: { eq: "slider" }
      }
    ) {
      nodes {
        relativePath
        relativeDirectory
      }
    }
  }
`;
