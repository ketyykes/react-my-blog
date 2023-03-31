import React from "react";
import { Banner, Footer, Navbar, Header } from "..";

const Layout = ({ children, banner }) => {
	console.log(banner);
	return (
		<>
			<Header>
				{banner ? (
					<Banner>
						<Navbar />
					</Banner>
				) : (
					<Navbar />
				)}
			</Header>
			<div>{children}</div>
			<Footer />
		</>
	);
};

export default Layout;
