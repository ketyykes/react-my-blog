import React, { useState } from "react";
import { Link } from "gatsby";
import "../../styles/global.scss";
import * as styles from "./navbar.module.scss";
const Navbar = () => {
	const { navbar, navbarHome, icon, ham, line, iconTxt, menuShow, menuNoshow } =
		styles;
	const [hamburger, setHamburger] = useState(false);
	const hamHandler = () => {
		setHamburger(!hamburger);
	};
	return (
		<nav className={`${navbar}`}>
			<div
				className={ham}
				onClick={hamHandler}
				aria-pressed={hamburger}
				role="button"
				tabIndex={0}
				aria-label="toggle memu"
				onKeyDown={hamHandler}
			>
				<span className={line}></span>
			</div>
			<div>
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
					<li>
						<Link to="/photo">攝影集</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
