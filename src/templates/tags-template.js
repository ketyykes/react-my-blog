import React from "react";
import { Layout, Seo } from "../components/index.js";
import {
	content,
	card,
} from "../styles/templates-styles/tech-and-tags-page.module.scss";
import { graphql, Link } from "gatsby";
import dayjs from "dayjs";
const tagsTemplate = ({ data }) => {
	const allTagMarkdownArticle = data.allMarkdownRemark.edges;
	return (
		<>
			<Layout>
				<div className={content}>
					{allTagMarkdownArticle.map(
						({
							node: {
								frontmatter: { date: articleLink, title: articleTitle },
								id,
							},
						}) => (
							<div className={card} key={id}>
								<h3>
									<Link
										to={
											"/tech-page/" +
											dayjs(articleLink).format("YYYY-MM-DD ddd")
										}
									>
										{articleTitle}
									</Link>
								</h3>
								<p>{dayjs(articleLink).format("YYYY-MM-DD ddd")}</p>
							</div>
						)
					)}
				</div>
			</Layout>
		</>
	);
};

export default tagsTemplate;
export const Head = ({ pageContext: { tag } }) => <Seo title={tag} />;

export const tagPageQuery = graphql`
	query TagPage($tag: String) {
		allMarkdownRemark(
			sort: { fields: [frontmatter___date], order: DESC }
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
