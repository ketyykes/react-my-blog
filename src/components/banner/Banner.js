import React from "react";
import Navbar from "../navbar/Navbar";
import * as styles from "./banner.module.scss";

const Banner = () => {
  return (
    <header className={styles.header}>
      <Navbar />
      <h2 className={styles.headerH2}>水土曜來了</h2>
    </header>
  );
};
export default Banner;
