import React from "react";
import { Banner, Footer, Header, Navbar } from "..";
import { Container, Box, IconButton } from "@mui/material";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

const Layout = ({ children, banner }) => {
	const scrollToNextScreen = () => {
		const nextScreenY = window.innerHeight;
		window.scrollTo({
			top: nextScreenY,
			behavior: "smooth",
		});
	};
	return (
		<>
			<Header>
				{banner ? (
					<>
						<Navbar />
						<Banner />
					</>
				) : (
					<Navbar />
				)}
			</Header>
			<Container maxWidth="false" component="main" sx={{ px: 0 }}>
				{banner && (
					<IconButton
						sx={{ margin: "2px auto", display: "block" }}
						onClick={scrollToNextScreen}
					>
						<ArrowCircleDownIcon />
					</IconButton>
				)}

				<Box
					sx={{ py: 6, minHeight: "calc(100vh - 156px)" }}
					component="section"
				>
					{children}
				</Box>
			</Container>
			<Footer />
		</>
	);
};

export default Layout;
