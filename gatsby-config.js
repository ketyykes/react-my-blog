module.exports = {
  siteMetadata: {
    title: `react-my-blog`,
    siteUrl: `https://www.yourdomain.tld`,
    description: `This is my first siteMetadata`,
  },

  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdownArticle`,
        path: `${__dirname}/src/pages/markdown-article`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `slider`,
        path: `${__dirname}/src/images/slider`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "portfolioCard",
        path: `${__dirname}/src/json`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    "gatsby-plugin-netlify",
  ],
};
