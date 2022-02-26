import React from "react";
import { Link } from "gatsby";
import "../styles/global.scss";
import * as styles from "../styles/layout.module.scss";

const Navbar = () => {
  console.log(styles);
  const { navbar, navbarHome, containerXxl } = styles;
  // {`${navbar} ${containerXxl}`}
  console.log(navbar);
  return (
    <nav className={`${navbar} `}>
      <div className={containerXxl}>
        <h1 className={navbarHome}>
          <Link to="/">
            <span>☿♄</span> 水土曜來了
          </Link>
        </h1>
        <ul>
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
