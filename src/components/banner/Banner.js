import React from "react";
import * as styles from "./banner.module.scss";
import Fade from "@mui/material/Fade";

const Banner = ({ children }) => {
	return (
		<Fade timeout={1000} in={true} appear={true}>
			<div className={styles.banner}>
				{children}
				<h2 className={styles.bannerH2}>水土曜來了</h2>
			</div>
		</Fade>
	);
};
export default Banner;
