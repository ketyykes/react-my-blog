import React, { useState } from "react";
import { Link } from "gatsby";
import "../styles/global.scss";
import * as styles from "../styles/layout.module.scss";
const Navbar = () => {
  console.log(styles);
  const { navbar, navbarHome, containerXxl, icon, ham, line, iconTxt ,menuShow} = styles;
  const [hamburger, setHamburger] = useState(false);
  const hamHandler = ()=>{
    setHamburger(!hamburger);
  }
  console.log(navbar);
  return (
      <nav className={`${navbar}`}>
        <div className={ham} onClick={hamHandler} role = "button">
          <span className={line}></span>
        </div>
        <div className={containerXxl}>
          <h1 className={navbarHome}>
            <Link to="/">
              <span className={icon}>☿♄</span>
              <span className={iconTxt}>水土曜來了</span>
            </Link>
          </h1>
          <ul className={`${hamburger ? menuShow : ""}`}>
            <li>
              <Link to="/">首頁</Link>
            </li>
            <li>
              <Link to="/about">關於我</Link>
            </li>
            <li>
              <Link to="/tech-page">技術文章</Link>
            </li>
          </ul>
        </div>
      </nav>
  );
};

export default Navbar;
