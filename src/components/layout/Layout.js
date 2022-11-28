import React from "react";
import { Banner, Footer } from "../";

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
