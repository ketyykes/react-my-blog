import React from "react";
import { graphql } from "gatsby";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import PhotoSlider from "../components/slider/PhotoSlider";
import PortfolioTab from "../components/portfolio/PortfolioTab";
import Head from "../components/head/Head";

const Index = ({ data }) => {
  return (
    <>
      <Head />
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
