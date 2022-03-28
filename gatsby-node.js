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
          }
        }
      }
}
`);

  // console.log(data);
  // console.log(util.inspect(data, {showHidden: false, depth: null, colors: true}))
  data.allMarkdownRemark.nodes.forEach((node) => {
    actions.createPage({
      path: '/tech-page/' + dayjs(node.frontmatter.date).format('YYYY-MM-DD ddd'),
      component: path.resolve("./src/templates/article-template.js"),
      context: {id:node.id,
        html:node.html,
        title:node.frontmatter.title,
        date:node.frontmatter.date
      }
    });
  });

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
    })
  })
};
