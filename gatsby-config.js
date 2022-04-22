module.exports = {
  siteMetadata: {
    title: `react-my-blog`,
    siteUrl: `https://www.yourdomain.tld`,
    description: `This is my first siteMetadata`,
  },

  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdownArticle`,
        path: `${__dirname}/src/pages/markdown-article`,
      },
    },
  ],
};
