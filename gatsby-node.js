const _ = require("lodash");
const path = require("path");
const util = require("util");
const dayjs = require("dayjs");
exports.createPages = async ({ graphql, actions }) => {
	const { data } = await graphql(`
		query articleTechQuery {
			allMarkdownRemark {
				nodes {
					html
					id
					frontmatter {
						title
						date
						tags
					}
					excerpt
				}
				group(field: { frontmatter: { tags: SELECT } }) {
					fieldValue
				}
			}
		}
	`);

	//markdown 轉成 html 頁面
	data.allMarkdownRemark.nodes.forEach((node) => {
		actions.createPage({
			path:
				"/tech-page/" + dayjs(node.frontmatter.date).format("YYYY-MM-DD ddd"),
			component: path.resolve("./src/templates/article-template.js"),
			context: {
				id: node.id,
				html: node.html,
				title: node.frontmatter.title,
				date: node.frontmatter.date,
				excerpt: node.excerpt,
			},
		});
	});

	//技術文章頁面
	const posts = data.allMarkdownRemark.nodes;
	const postsPerPage = 10;
	const numPages = Math.ceil(posts.length / postsPerPage);

	Array.from({ length: numPages }).forEach((_, i) => {
		actions.createPage({
			path: i === 0 ? `/tech-page/` : `/tech-page/${i + 1}`,
			component: path.resolve("./src/templates/tech-page-template.js"),
			context: {
				perPage: postsPerPage,
				numPages,
				currentPage: i + 1,
			},
		});
	});

	const tags = data.allMarkdownRemark.group.map((tag) => tag.fieldValue);
	tags.forEach((tag) => {
		const tagPath = `/tags/${_.kebabCase(tag)}/`;
		actions.createPage({
			path: tagPath,
			component: path.resolve(`src/templates/tags-template.js`),
			context: {
				tag,
			},
		});
	});
};

// 注意：因為以下 Webpack 設定完全忽略了警告，它可能會隱藏 Project 中，因為 CSS 順序打包的有效警告。
exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
	if (stage === "build-javascript" || stage === "develop") {
		const config = getConfig();
		const miniCssExtractPlugin = config.plugins.find(
			(plugin) => plugin.constructor.name === "MiniCssExtractPlugin"
		);
		if (miniCssExtractPlugin) miniCssExtractPlugin.options.ignoreOrder = true;
		actions.replaceWebpackConfig(config);
	}
};
