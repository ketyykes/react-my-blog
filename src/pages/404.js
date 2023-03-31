import React from "react";
import { Layout, Seo } from "../components";
import { notFound } from "../styles/pages-styles/notfound.module.scss";

const NotFound = () => {
	return (
		<>
			<Layout>
				<div className={notFound}>
					<h2>404抱歉你輸入的頁面無法被找到</h2>
				</div>
			</Layout>
		</>
	);
};

export const Head = () => <Seo title="Not Found" />;
export default NotFound;
