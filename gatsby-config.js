module.exports = {
  siteMetadata: {
    title: `react-my-blog`,
    siteUrl: `https://www.yourdomain.tld`,
    description: `This is my first siteMetadata`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    'gatsby-transformer-remark',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdownArticle`,
        path: `${__dirname}/src/pages/markdown-article`,
      },
    },
  ],
};
