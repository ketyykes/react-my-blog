import { navigate } from "gatsby";
// tech-page-template 用途：

// 篩選文章標題函式
export const filterArticles = (articles, searchValue) =>
	articles.filter((article) =>
		article.frontmatter.title.toLowerCase().includes(searchValue.toLowerCase())
	);

// 分頁顯示文章函式
export const getPaginatedArticles = (articles, perPage, currentPage) =>
	articles.slice(perPage * (currentPage - 1), perPage * currentPage);

// 更新 URL 查詢參數函式
export const updateURLQuery = (searchValue) => {
	const params = new URLSearchParams(window.location.search);
	if (searchValue) {
		params.set("search", searchValue);
	} else {
		params.delete("search");
	}
	navigate(`?${params.toString()}`, { replace: true });
};

// 導向第一頁函式
export const navigateToFirstPage = (searchValue) => {
	const params = new URLSearchParams();
	if (searchValue) {
		params.set("search", searchValue);
	}
	navigate(`/tech-page/?${params.toString()}`);
};
