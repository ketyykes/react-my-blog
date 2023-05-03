import React from "react";
import {
	Card,
	CardContent,
	CardHeader,
	Typography,
	useMediaQuery,
	ImageList,
	ImageListItem,
} from "@mui/material";
import ImageDialogs from "./ImageDialogs";

const PortfolioTabPanel = ({ index, value, data }) => {
	const currentMedia = {
		// isMobile: useMediaQuery(" ( width < 576px ) "),
		isTablet: useMediaQuery(" (width < 768px) "),
		isDesktopLg: useMediaQuery(" (769px <= width <= 992px) "),
		isDesktopXl: useMediaQuery(" (993px <= width <= 1440px) "),
		isDesktopXXl: useMediaQuery(" ( width > 1441px ) "),
	};

	const imageListCol = (({
		// isMobile,
		isTablet,
		isDesktopLg,
		isDesktopXl,
		isDesktopXXl,
	}) => {
		if (isTablet) return 1;
		if (isDesktopLg) return 2;
		if (isDesktopXl) return 3;
		if (isDesktopXXl) return 4;
		return 1;
	})(currentMedia);
	console.log(imageListCol);
	return (
		<div style={{ marginTop: imageListCol * 10 }}>
			{/* {value === index && (
				<Grid container spacing={2} sx={{ justifyContent: "center" }}>
					{data.map((cardItemObject, index) => (
						<Grid item xs={12} lg={4} xl={3} md={6} sm={6} key={index}>
							<Card
								sx={{
									borderRadius: "20px",
									mt: 2,
									minHeight: isMobile ? null : "500px",
								}}
							>
								<CardHeader
									title={cardItemObject.cardHead}
									sx={{ textAlign: "center" }}
								></CardHeader>
								<CardContent>
									<ImageDialogs cardItemObject={cardItemObject} />
									<Typography variant="body1" sx={{ mt: 2 }}>
										{cardItemObject.cardContent}
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			)} */}

			{value === index && (
				<ImageList
					variant="masonry"
					cols={imageListCol}
					gap={imageListCol * 10}
				>
					{data.map((cardItemObject, index) => (
						<ImageListItem key={index}>
							<Card
								sx={{
									borderRadius: "20px",
								}}
							>
								<CardHeader
									title={cardItemObject.cardHead}
									sx={{ textAlign: "center" }}
								></CardHeader>
								<CardContent>
									<ImageDialogs cardItemObject={cardItemObject} />
									<Typography variant="body1" sx={{ mt: 2 }}>
										{cardItemObject.cardContent}
									</Typography>
								</CardContent>
							</Card>
						</ImageListItem>
					))}
				</ImageList>
			)}
		</div>
	);
};

export default PortfolioTabPanel;
