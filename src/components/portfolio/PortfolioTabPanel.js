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

	if (value === index) {
		return (
			<div style={{ marginTop: imageListCol * 10 }}>
				{
					<ImageList
						variant="masonry"
						cols={imageListCol}
						gap={imageListCol * 20}
						sx={{ overflow: "visible" }}
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
				}
			</div>
		);
	} else {
		return null;
	}
};

export default PortfolioTabPanel;
