import React from "react";
import { Layout, Seo } from "../components";
import { articleContent } from "../styles/templates-styles/article-template.module.scss";
const dayjs = require("dayjs");
const articleTemplate = ({ pageContext }) => {
	const { html, title, date } = pageContext;
	const fomateDate = dayjs(date).format("YYYY-MM-DD ddd");
	return (
		<>
			<Layout>
				<div className={articleContent}>
					<h2>{title}</h2>
					<h3>{fomateDate}</h3>
					<div dangerouslySetInnerHTML={{ __html: html }} />
				</div>
			</Layout>
		</>
	);
};

export const Head = () => <Seo title="Article" />;
export default articleTemplate;
