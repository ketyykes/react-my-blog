const path = require("path");
const util = require("util");
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
  console.log(data);
  console.log(util.inspect(data, {showHidden: false, depth: null, colors: true}))
  data.allMarkdownRemark.nodes.forEach((node) => {
    actions.createPage({
      path: '/tech-page/' + node.id,
      component: path.resolve("./src/templates/article-template.js"),
      context: {id:node.id,
        html:node.html,
        title:node.frontmatter.title,
        date:node.frontmatter.date
      }
    });
  });
};
