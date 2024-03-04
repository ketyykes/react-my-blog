import React from "react";
import { Layout, Seo } from "../components";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "../../pre.css";
import { articleContent } from "../styles/templates-styles/article-template.module.scss";
const dayjs = require("dayjs");
const articleTemplate = ({ pageContext }) => {
	const { html, title, date } = pageContext;
	const formateDate = dayjs(date).format("YYYY-MM-DD ddd");
	return (
		<>
			<Layout>
				<div className={articleContent}>
					<h2>{title}</h2>
					<h3>{formateDate}</h3>
					<div dangerouslySetInnerHTML={{ __html: html }} />
				</div>
			</Layout>
		</>
	);
};

export const Head = () => <Seo title="Article" />;
export default articleTemplate;
