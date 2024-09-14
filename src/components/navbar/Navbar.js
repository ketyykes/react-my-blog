import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
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
	top0,
	topHidden,
} from "./navbar.module.scss";

const Navbar = () => {
	const [hamburger, setHamburger] = useState(false);
	const hamHandler = () => {
		setHamburger(!hamburger);
	};
	const [showNavbar, setShowNavbar] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		let ticking = false;
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (hamburger) return; // 如果漢堡選單打開，不執行下面的程式碼
			if (!ticking) {
				window.requestAnimationFrame(() => {
					setShowNavbar(currentScrollY < lastScrollY);
					setLastScrollY(currentScrollY);
					ticking = false;
				});
				ticking = true;
			}
		};
		if (typeof window !== "undefined") {
			window.addEventListener("scroll", handleScroll);
			return () => window.removeEventListener("scroll", handleScroll);
		}
	}, [lastScrollY, setShowNavbar, hamburger]);

	return (
		<nav className={`${navbar} ${showNavbar ? top0 : topHidden}`}>
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
