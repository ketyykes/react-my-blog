module.exports = {
	siteMetadata: {
		title: `水土曜來了`,
		siteUrl: `https://wedsatcoming.com`,
		description: `在日語當中，水曜日和土曜日分別代表星期三和星期六的意思，另外也分別代表水星和土星之意，在占星學當中水星象徵個人的心智活動及邏輯思維，土星則有隱含著 困難、壓力、磨練等等的意思，而這個技術部落格呼應的就是邏輯思考，筆記這些過程也間接表示遇到程式上面的 BUG。`,
		author: `DannyChen`,
		keywords: `前端開發，React, Gatsby, JavaScript, TypeScript, Vue, CSS, SCSS, 技術部落格，程式設計，Web 開發，水土曜來了`,
		image: `/myBlogIcon.png`,
		language: `zh-TW`,
		locale: `zh_TW`,
		type: `website`,
	},
	trailingSlash: "never",
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
		{
			resolve: `gatsby-plugin-sharp`,
			options: {
				defaults: {
					formats: [`auto`, `webp`],
					quality: 50,
					breakpoints: [576, 768, 1366, 1920],
					backgroundColor: `transparent`,
				},
			},
		},
		"gatsby-plugin-netlify",
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `水土曜來了`,
				short_name: `水土曜來了`,
				start_url: `/`,
				background_color: `#469ad5`,
				theme_color: `#4296d11f`,
				display: `standalone`,
				icon: `src/images/myBlogIcon.png`,
			},
		},
		`gatsby-plugin-catch-links`,
		{
			resolve: "gatsby-plugin-anchor-links",
			options: {
				offset: 3000,
				duration: 100,
			},
		},
		`gatsby-plugin-sitemap`,
		{
			resolve: `gatsby-plugin-robots-txt`,
			options: {
				host: `https://wedsatcoming.com`,
				sitemap: `https://wedsatcoming.com/sitemap-index.xml`,
				policy: [{ userAgent: "*", allow: "/" }],
			},
		},
		{
			resolve: `gatsby-plugin-google-gtag`,
			options: {
				trackingIds: ["GA-G-LG43TDEXTF", "AW-CONVERSION_ID", "DC-FLOODIGHT_ID"],
				gtagConfig: {
					anonymize_ip: true,
					cookie_expires: 0,
				},
				pluginConfig: {
					head: true,
					respectDNT: false,
					delayOnRouteUpdate: 50,
				},
			},
		},
	],
};
