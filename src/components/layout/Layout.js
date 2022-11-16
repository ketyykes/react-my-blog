import React from "react";
import Footer from "../footer/Footer";
import Banner from "../banner/Banner";

const Layout = ({ children }) => {
  return (
    <>
      <Banner />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
