import * as React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

function Seo({ description, title, children }) {
	const { site } = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
						description
						author
					}
				}
			}
		`
	);
	const metaDescription = description || site.siteMetadata.description;
	const defaultTitle = site.siteMetadata?.title;
	return (
		<>
			<title>{defaultTitle ? `${defaultTitle} | ${title}` : title}</title>
			<meta name="description" content={metaDescription} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={metaDescription} />
			<meta property="og:type" content="website" />
			<meta name="twitter:card" content="summary" />
			<meta name="twitter:creator" content={site.siteMetadata?.author || ``} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={metaDescription} />
			{children}
		</>
	);
}

Seo.defaultProps = {
	description: ``,
};

Seo.propTypes = {
	description: PropTypes.string,
	title: PropTypes.string.isRequired,
};

export default Seo;
