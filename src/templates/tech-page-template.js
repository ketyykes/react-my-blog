import React, { useState, useEffect } from "react";
import { Pager, Seo, ArticleCard, SearchInput } from "../components";
import { graphql } from "gatsby";
import dayjs from "dayjs";
import {
	filterArticles,
	getPaginatedArticles,
	updateURLQuery,
	navigateToFirstPage,
} from "./module/module.js";
import { content } from "../styles/templates-styles/tech-and-tags-page.module.scss";

const TechPageTemplate = ({ pageContext, data }) => {
	const allMarkdownArticles = data.allMarkdownRemark.nodes;
	const { perPage, currentPage } = pageContext;

	const initialSearchValue =
		new URLSearchParams(window.location.search).get("search") || "";

	const [inputValue, setInputValue] = useState(initialSearchValue);
	const [searchValue, setSearchValue] = useState(initialSearchValue);

	// 根據搜尋值篩選文章
	const filteredArticles = filterArticles(allMarkdownArticles, searchValue);

	// 設置分頁後顯示的資料
	const paginatedArticles = getPaginatedArticles(
		filteredArticles,
		perPage,
		currentPage
	);

	useEffect(() => {
		updateURLQuery(searchValue);
		if (currentPage > Math.ceil(filteredArticles.length / perPage)) {
			navigateToFirstPage(searchValue);
		}
	}, [searchValue, currentPage, perPage, filteredArticles.length]);

	return (
		<div className={content}>
			<SearchInput
				inputValue={inputValue}
				setInputValue={setInputValue}
				onSearch={() => setSearchValue(inputValue)} // 新增 onSearch 回呼
			/>
			{paginatedArticles.map((article) => (
				<ArticleCard
					key={article.id}
					title={article.frontmatter.title}
					date={article.frontmatter.date}
					linkPath={`/tech-page/${dayjs(article.frontmatter.date).format(
						"YYYY-MM-DD ddd"
					)}`}
				/>
			))}
			<PaginationOrMessage
				articles={paginatedArticles}
				filteredArticles={filteredArticles}
				perPage={perPage}
				currentPage={currentPage}
			/>
		</div>
	);
};

// 分頁器或無文章訊息元件
const PaginationOrMessage = ({
	articles,
	filteredArticles,
	perPage,
	currentPage,
}) =>
	articles.length === 0 ? (
		<p>找不到符合條件的文章</p>
	) : (
		<Pager
			allmarkdownArticle={filteredArticles}
			perPage={perPage}
			currentPage={currentPage}
		/>
	);

export default TechPageTemplate;

export const Head = () => (
	<>
		<html lang="zh-Hant-TW" />
		<Seo title="Tech-page" />
	</>
);

export const query = graphql`
	{
		allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
			nodes {
				frontmatter {
					title
					date
				}
				id
			}
		}
	}
`;
