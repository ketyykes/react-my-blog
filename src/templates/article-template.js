import React from "react";
import { Layout, Seo } from "../components";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "../../pre.css";
import { articleContent } from "../styles/templates-styles/article-template.module.scss";
import Giscus from "@giscus/react";

const dayjs = require("dayjs");
const articleTemplate = ({ pageContext }) => {
	const { html, title, date } = pageContext;
	const formateDate = dayjs(date).format("YYYY-MM-DD ddd");
	return (
		<>
			<Layout>
				<div className={articleContent}>
					<h1>{title}</h1>
					<h2>{formateDate}</h2>
					<article dangerouslySetInnerHTML={{ __html: html }} />

					<Giscus
						id="comments"
						repo="ketyykes/react-my-blog"
						repoId="R_kgDOG8KeJw"
						term="Welcome to my wedsatcoming blog"
						category="Announcements"
						categoryId="DIC_kwDOG8KeJ84CdyXw"
						mapping="og:title"
						reactionsEnabled="1"
						emitMetadata="0"
						inputPosition="bottom"
						theme="cobalt"
						lang="zh-TW"
						loading="lazy"
					/>
				</div>
			</Layout>
		</>
	);
};

export const Head = ({ pageContext: { title } }) => {
	return <Seo title={title} />;
};
export default articleTemplate;
