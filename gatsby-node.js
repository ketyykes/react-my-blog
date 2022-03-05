const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
  query articleTechQuery {
    allMarkdownRemark {
        nodes {
          html
          id
          frontmatter {
            title
            stack
            slug
          }
        }
      }
}
`);
  console.log(data);

  data.allMarkdownRemark.nodes.forEach((node) => {
    actions.createPage({
      path: '/tech-page/' + node.id,
      component: path.resolve("./src/templates/article-template.js"),
      context: {id:node.id}
    });
  });
};
