import React from "react";
import * as styles from "./banner.module.scss";

const Banner = ({ children }) => {
	return (
		<div className={styles.banner}>
			{children}
			<h2 className={styles.bannerH2}>水土曜來了</h2>
		</div>
	);
};
export default Banner;
