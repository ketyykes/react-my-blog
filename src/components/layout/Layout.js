import React from "react";
import "../../styles/global.scss";
import Footer from "../footer/Footer";
import Banner from "../banner/Banner";
import Head from "../head/Head";

const Layout = ({ children }) => {
  return (
    <>
      <Head />
      <Banner />
      <div className="container">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
