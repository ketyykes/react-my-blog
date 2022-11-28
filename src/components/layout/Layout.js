import React from "react";
import { Banner, Footer, Navbar, Header } from "../";

const Layout = ({ children }) => {
	return (
		<>
			<Header>
				<Banner>
					<Navbar />
				</Banner>
			</Header>
			<div>{children}</div>
			<Footer />
		</>
	);
};

export default Layout;
