import React, { useState } from "react";
import {
	Container,
	ImageList,
	ImageListItem,
	useMediaQuery,
	Box,
} from "@mui/material";
import CircularPercentProgress from "../circularPercentProgress/CircularPercentProgress";

const Album = () => {
	const currentMedia = {
		isMobile: useMediaQuery(" ( width < 576px ) "),
		isTablet: useMediaQuery(" (577px <= width <= 768px) "),
		isDesktopLg: useMediaQuery(" (769px <= width <= 992px) "),
		isDesktopXl: useMediaQuery(" ( width > 993px ) "),
	};
	const [loading, setLoading] = useState(true);
	const [progress, setProgress] = useState(0);
	const imageListCol = (({ isMobile, isTablet, isDesktopLg, isDesktopXl }) => {
		if (isMobile) return 1;
		if (isTablet) return 2;
		if (isDesktopLg) return 3;
		if (isDesktopXl) return 4;
	})(currentMedia);

	function percentage(partialValue, totalValue) {
		return (100 * partialValue) / totalValue;
	}
	const onComplete = () => {
		setProgress((prev) => prev + percentage(1, 97));
		if (progress > 98) {
			setLoading(false);
		}
	};
	return (
		<Container maxWidth="false" sx={{ p: 10 }}>
			{loading && (
				<Box sx={{ display: "flex", justifyContent: "center" }}>
					<CircularPercentProgress value={progress} />
				</Box>
			)}
			<ImageList variant="masonry" cols={imageListCol} gap={100}>
				{Array.from({ length: 97 }).map((_, index) => (
					<ImageListItem key={index}>
						<img
							src={`https://filedn.eu/ll8NkasFkw1XVJBG2Fp9A1p/gatsby_image/instagram_post/igpo${index}.jpg`}
							alt={`instagram_post${index}`}
							onLoad={onComplete}
							style={{
								borderRadius: "20px",
								display: loading ? "none" : "inline",
							}}
						/>
					</ImageListItem>
				))}
			</ImageList>
		</Container>
	);
};

export default Album;
