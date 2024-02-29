import React, { useState, useEffect, useRef } from "react";
import { Link } from "gatsby";
import "../../styles/global.scss";
import {
	navbar,
	navbarHome,
	icon,
	ham,
	line,
	iconTxt,
	menuShow,
	menuNoshow,
	activeNavbar,
} from "./navbar.module.scss";

const Navbar = () => {
	const [hamburger, setHamburger] = useState(false);
	const hamHandler = () => {
		setHamburger(!hamburger);
	};
	const [showNavbar, setShowNavbar] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	const controlNavbar = () => {
		if (typeof window !== "undefined") {
			if (window.scrollY < lastScrollY) {
				setShowNavbar(true);
			} else {
				setShowNavbar(false);
			}
			setLastScrollY(window.scrollY);
		}
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("scroll", controlNavbar);

			return () => {
				window.removeEventListener("scroll", controlNavbar);
			};
		}
	}, [lastScrollY]);

	return (
		<nav
			className={navbar}
			style={{
				position: "fixed",
				top: showNavbar ? "0" : "-100px",
				transition: "top 0.3s",
			}}
		>
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
				<ul className={hamburger ? menuShow : menuNoshow}>
					<li>
						<Link activeClassName={activeNavbar} to="/">
							首頁
						</Link>
					</li>
					<li>
						<Link activeClassName={activeNavbar} to="/about/">
							關於我
						</Link>
					</li>
					<li>
						<Link activeClassName={activeNavbar} to="/tech-page/">
							技術文章
						</Link>
					</li>
					<li>
						<Link activeClassName={activeNavbar} to="/photo/">
							攝影集
						</Link>
					</li>
					<li>
						<Link activeClassName={activeNavbar} to="/tags/">
							標籤
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
