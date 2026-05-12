import React from "react";
import { Seo } from "../components";
import { notFound } from "../styles/pages-styles/notfound.module.scss";

const NotFound = () => {
	return (
		<div className={notFound}>
			<h2>404 抱歉你輸入的頁面無法被找到</h2>
		</div>
	);
};

export const Head = () => (
	<>
		<Seo title="Not Found" />;
	</>
);
export default NotFound;
