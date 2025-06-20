import React from "react";
import { Seo } from "../components";
import "prismjs/themes/prism-okaidia.css";
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
					data-strict="0"
				/>
			</div>
		</>
	);
};

export const Head = ({ pageContext: { title, excerpt, date, tags, slug } }) => (
	<>
		<html lang="zh-Hant-TW" />
		<Seo
			title={title}
			description={excerpt}
			article={true}
			publishedDate={date}
			tags={tags || []}
			pathname={slug}
		/>
	</>
);
export default articleTemplate;
