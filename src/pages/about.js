import React, { useState, useEffect, useRef } from "react";
import { Seo } from "../components";
import { Skeleton } from "@mui/material/";
import {
	wrapAbout,
	avatarAbout,
} from "../styles/pages-styles/about.module.scss";
import AvatarImg from "../images/avatar-about.jpg";
const About = () => {
	const imageRef = useRef(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (imageRef?.current?.complete) {
			setLoading(false);
		}
	}, []);
	return (
		<div className={wrapAbout}>
			<div className={avatarAbout}>
				<img
					decoding="async"
					ref={imageRef}
					style={{ display: loading ? "none" : "inline" }}
					src={AvatarImg}
					alt="avatar"
					onLoad={() => setLoading(false)}
				/>
				{loading && <Skeleton variant="rectangular" height="525px" />}
			</div>
			<h2>關於我</h2>
			<p>
				在日語當中，水曜日和土曜日分別代表星期三和星期六的意思，另外也分別代表水星和土星之意，在占星學當中水星象徵個人的心智活動及邏輯思維，土星則有隱含著
				困難、壓力、磨練等等的意思，而這個技術部落格呼應的就是邏輯思考，筆記這些過程也間接表示遇到程式上面的
				BUG。
			</p>
		</div>
	);
};

export default About;
export const Head = () => (
	<>
		<Seo
			title="關於我"
			description="了解作者 DannyChen 的技術背景，以及水土曜來了技術部落格的創立理念和技術分享初衷"
			pathname="/about/"
		/>
	</>
);
