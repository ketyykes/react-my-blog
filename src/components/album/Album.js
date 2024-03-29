import React, { useState, useRef, useEffect } from "react";
import { ImageList, ImageListItem, useMediaQuery, Box } from "@mui/material";
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

	const IMAGE_AMOUNT = 97;
	const imageRefs = useRef([]);

	useEffect(() => {
		const timer = setInterval(() => {
			if (imageRefs?.current?.every((el) => el.complete === true)) {
				setLoading(false);
			}
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	function percentage(partialValue, totalValue) {
		return (100 * partialValue) / totalValue;
	}

	const onComplete = (e) => {
		if (e.target.complete) {
			setProgress((prev) => prev + percentage(1, IMAGE_AMOUNT));
		}
	};
	return (
		<>
			{loading && (
				<Box sx={{ display: "flex", justifyContent: "center" }}>
					<CircularPercentProgress value={progress} />
				</Box>
			)}
			<ImageList variant="masonry" cols={imageListCol} gap={100}>
				{Array.from({ length: IMAGE_AMOUNT }).map((_, index) => (
					<ImageListItem key={index}>
						<img
							src={`https://res.cloudinary.com/deqqrzo3t/image/upload/v1678350386/my-blog/instagram_post/igpo-${
								index + 1
							}.jpg
							`}
							decoding="async"
							ref={(el) => (imageRefs.current[index] = el)}
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
		</>
	);
};

export default Album;
