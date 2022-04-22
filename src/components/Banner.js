import React from "react";
import Navbar from "./Navbar";
import * as styles from "../styles/components-styles/banner.module.scss";
const Banner = () => {
  return (
    <>
      <div className={styles.header}>
      <Navbar />
        <h2 className={styles.headerH2}>水土曜來了</h2>
      </div>
    </>
  );
};
export default Banner;
