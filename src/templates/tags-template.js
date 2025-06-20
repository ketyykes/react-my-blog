import React from "react";
import { content } from "../styles/templates-styles/tech-and-tags-page.module.scss";
import { Seo, ArticleCard } from "../components/index.js";

import { graphql } from "gatsby";
import dayjs from "dayjs";
const TagsTemplate = ({ data }) => {
	const allTagMarkdownArticle = data.allMarkdownRemark.edges;

	return (
		<div className={content}>
			{allTagMarkdownArticle.map(
				({
					node: {
						frontmatter: { date, title },
						id,
					},
				}) => (
					<ArticleCard
						key={id}
						title={title}
						date={date}
						linkPath={`/tech-page/${dayjs(date).format("YYYY-MM-DD ddd")}`}
					/>
				)
			)}
		</div>
	);
};

export default TagsTemplate;
export const Head = ({ pageContext: { tag } }) => (
	<>
		<html lang="zh-Hant-TW" />
		<Seo title={tag} />;
	</>
);

export const tagPageQuery = graphql`
	query TagPage($tag: String) {
		allMarkdownRemark(
			sort: { frontmatter: { date: DESC } }
			filter: { frontmatter: { tags: { in: [$tag] } } }
		) {
			totalCount
			edges {
				node {
					frontmatter {
						title
						date
					}
					id
				}
			}
		}
	}
`;
