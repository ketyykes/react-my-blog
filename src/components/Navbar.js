import React, { useState } from "react";
import { Link } from "gatsby";
import "../styles/global.scss";
import * as styles from "../styles/navbar.module.scss";
import "../styles/global.scss";
const Navbar = () => {
  // console.log(styles);
  const { navbar, navbarHome, icon, ham, line, iconTxt ,menuShow,menuNoshow} = styles;
  const [hamburger, setHamburger] = useState(false);
  const hamHandler = ()=>{
    setHamburger(!hamburger);
  }
  // console.log(navbar);
  return (
      <nav className={`${navbar}`}>
        <div className={ham} onClick={hamHandler} role = "button"  tabIndex={0} onKeyDown={hamHandler}>
          <span className={line}></span>
        </div>
        <div className="container-xxl">
          <h1 className={navbarHome}>
            <Link to="/">
              <span className={icon}>☿♄</span>
              <span className={iconTxt}>水土曜來了</span>
            </Link>
          </h1>
          <ul className={`${hamburger ? menuShow : menuNoshow}`}>
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
