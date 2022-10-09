import React from "react";
import "../../styles/global.scss";
import Footer from "../footer/Footer";
import Banner from "../banner/Banner";

const Layout = ({ children }) => {
  return (
    <>
      <Banner />
      <div className="container">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
