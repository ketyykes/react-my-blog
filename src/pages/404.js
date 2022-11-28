import React from "react";
import { Header, Footer, Seo } from "../components";
import { not_found } from "../styles/pages-styles/notfound.module.scss";

const NotFound = () => {
  return (
    <>
      <Header />
      <div className={not_found}>
        <h2>404抱歉你輸入的頁面無法被找到</h2>
      </div>
      <Footer />
    </>
  );
};

export const Head = () => <Seo title="Not Found" />;
export default NotFound;
