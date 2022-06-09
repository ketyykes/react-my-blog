import React from "react";
import "../../styles/global.scss";
import Footer from "../footer/Footer";
import Banner from "../banner/Banner";
import { graphql, useStaticQuery } from "gatsby";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          description
          title
        }
      }
    }
  `);
  // console.log(data);
  return (
    <>
      <Banner />
      <div className="container">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
