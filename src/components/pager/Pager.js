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
		// 取得當前 URL 的 query string
		const params = new URLSearchParams(window.location.search);
		const queryString = params.toString() ? `?${params.toString()}` : "";

		// 根據分頁決定新的導航路徑
		const path =
			value === 1
				? `/tech-page/${queryString}`
				: `/tech-page/${value}${queryString}`;
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
