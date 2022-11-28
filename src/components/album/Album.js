import React from "react";
import {
	Container,
	ImageList,
	ImageListItem,
	useMediaQuery,
} from "@mui/material";

const Album = () => {
	const currentMedia = {
		mobile: useMediaQuery(" ( width < 576px ) "),
		tablet: useMediaQuery(" (577px <= width <= 768px) "),
		desktopLg: useMediaQuery(" (769px <= width <= 992px) "),
		desktopXl: useMediaQuery(" ( width > 993px ) "),
	};
	const imageListCol = (({ mobile, tablet, desktopLg, desktopXl }) => {
		if (mobile) return 1;
		if (tablet) return 2;
		if (desktopLg) return 3;
		if (desktopXl) return 4;
	})(currentMedia);
	return (
		<Container maxWidth="false" sx={{ p: 1 }}>
			<ImageList variant="masonry" cols={imageListCol} gap={20}>
				{Array.from({ length: 97 }).map((_, index) => (
					<ImageListItem key={index}>
						<img
							src={`https://filedn.eu/ll8NkasFkw1XVJBG2Fp9A1p/gatsby_image/instagram_post/igpo${index}.jpg`}
							alt={`instagram_post${index}`}
							loading="lazy"
							style={{ borderRadius: "20px" }}
						/>
					</ImageListItem>
				))}
			</ImageList>
		</Container>
	);
};

export default Album;
