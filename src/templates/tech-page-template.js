import React, { useState, useEffect } from "react";
import { Pager, Seo, ArticleList } from "../components";
import { graphql, Link, navigate } from "gatsby";
import TextField from "@mui/material/TextField";

import {
	filterArticles,
	getPaginatedArticles,
	updateURLQuery,
	navigateToFirstPage,
} from "./module/module.js";
import {
	content,
	input,
} from "../styles/templates-styles/tech-and-tags-page.module.scss";

const TechPageTemplate = ({ pageContext, data }) => {
	const allMarkdownArticles = data.allMarkdownRemark.nodes;
	const { perPage, currentPage } = pageContext;

	// 初始從 URL 讀取搜尋參數
	const initialSearchValue =
		new URLSearchParams(window.location.search).get("search") || "";

	// 使用 useState 來保存 TextField 的輸入值
	const [inputValue, setInputValue] = useState(initialSearchValue);

	// 篩選文章標題
	const filteredArticles = filterArticles(allMarkdownArticles, inputValue);

	// 設置分頁後顯示的資料
	const paginatedArticles = getPaginatedArticles(
		filteredArticles,
		perPage,
		currentPage
	);

	// 當輸入值改變時，更新 URL 的 query string
	useEffect(() => {
		updateURLQuery(inputValue);
		if (currentPage > Math.ceil(filteredArticles.length / perPage)) {
			navigateToFirstPage(inputValue);
		}
	}, [inputValue]);

	return (
		<div className={content}>
			<SearchInput inputValue={inputValue} setInputValue={setInputValue} />
			<ArticleList articles={paginatedArticles} />
			<PaginationOrMessage
				articles={paginatedArticles}
				filteredArticles={filteredArticles}
				perPage={perPage}
				currentPage={currentPage}
			/>
		</div>
	);
};

// 搜尋輸入元件
const SearchInput = ({ inputValue, setInputValue }) => (
	<TextField
		label="搜尋文章標題"
		variant="outlined"
		margin="normal"
		value={inputValue}
		className={input}
		onChange={(e) => setInputValue(e.target.value)}
	/>
);

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
