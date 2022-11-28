import React from "react";
import { graphql } from "gatsby";
import { Layout, PortfolioTab } from "../components/index";
import Seo from "../components/seo/Seo";

const Index = ({ data }) => {
  return (
    <>
      <Layout>
        <PortfolioTab />
      </Layout>
    </>
  );
};

export default Index;
export const Head = () => <Seo title="Home" />;
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
