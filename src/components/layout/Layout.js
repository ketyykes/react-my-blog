import React from "react";
import { Banner, Footer, Navbar, Header } from "..";
import { Container } from "@mui/material";

const Layout = ({ children, banner }) => {
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
			<Container
				maxWidth="false"
				sx={{ py: 10, minHeight: "calc(100vh - 60px)" }}
			>
				{children}
			</Container>
			<Footer />
		</>
	);
};

export default Layout;
