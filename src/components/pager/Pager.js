import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useMediaQuery } from "@mui/material";

import { navigate } from "gatsby";

const Pager = ({ currentPage, allmarkdownArticle, perPage }) => {
	const totalPages = Math.ceil(allmarkdownArticle.length / perPage);

	const currentMedia = {
		isMobile: useMediaQuery(" ( width < 576px ) "),
		isTablet: useMediaQuery(" (577px <= width <= 768px) "),
		isDesktopLg: useMediaQuery(" (769px <= width <= 992px) "),
		isDesktopXl: useMediaQuery(" ( width > 993px ) "),
	};

	const determineSize = (deviceInfo) => {
		if (currentMedia.isMobile) return "small";
		if (currentMedia.isTablet) return "medium";
		if (currentMedia.isDesktopLg || deviceInfo.isDesktopXl) return "large";
		return "medium";
	};
	const handleChange = (event, value) => {
		const path = value === 1 ? "/tech-page/" : `/tech-page/${value}`;
		navigate(path);
	};

	return (
		<Stack spacing={2}>
			<Pagination
				count={totalPages}
				page={currentPage}
				onChange={handleChange}
				color="primary"
				size={determineSize(currentMedia)}
			/>
		</Stack>
	);
};

export default Pager;
