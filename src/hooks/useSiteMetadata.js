import { useStaticQuery, graphql } from "gatsby";

const useSiteMetadata = () => {
	const data = useStaticQuery(graphql`
		query SiteMetadata {
			site {
				siteMetadata {
					title
					description
					author
					siteUrl
					keywords
					image
					language
					locale
					type
				}
			}
		}
	`);

	return data.site.siteMetadata;
};

export default useSiteMetadata;
