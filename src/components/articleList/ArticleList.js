import React from "react";
import { Link } from "gatsby";
import { card } from "./articleList.module.scss";
import dayjs from "dayjs";

const ArticleList = ({ articles }) => (
	<>
		{articles.map((article) => (
			<div className={card} key={article.id}>
				<h3>
					<Link
						to={`/tech-page/${dayjs(article.frontmatter.date).format(
							"YYYY-MM-DD ddd"
						)}`}
					>
						{article.frontmatter.title}
					</Link>
				</h3>
				<p>{dayjs(article.frontmatter.date).format("YYYY-MM-DD ddd")}</p>
			</div>
		))}
	</>
);

export default ArticleList;
