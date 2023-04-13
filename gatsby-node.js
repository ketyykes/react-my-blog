const _ = require("lodash");
const path = require("path");
const util = require("util");
const dayjs = require("dayjs");
const { TagSharp } = require("@mui/icons-material");
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
				}
				group(field: frontmatter___tags) {
					fieldValue
				}
			}
		}
	`);

	//markdown轉成html頁面
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
