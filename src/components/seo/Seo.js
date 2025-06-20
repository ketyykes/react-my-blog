import React from "react";
import PropTypes from "prop-types";
import useSiteMetadata from "../../hooks/useSiteMetadata";

const Seo = ({
	title,
	description,
	image,
	pathname,
	article = false,
	publishedDate,
	modifiedDate,
	tags = [],
	children,
}) => {
	const {
		title: defaultTitle,
		description: defaultDescription,
		siteUrl,
		image: defaultImage,
		author,
		keywords: defaultKeywords,
		language,
		locale,
		type: defaultType,
	} = useSiteMetadata();

	const seo = {
		title: title ? `${title} | ${defaultTitle}` : defaultTitle,
		description: description || defaultDescription,
		image: image ? `${siteUrl}${image}` : `${siteUrl}${defaultImage}`,
		url: pathname ? `${siteUrl}${pathname}` : siteUrl,
		keywords: tags.length > 0 ? tags.join(", ") : defaultKeywords,
		type: article ? "article" : defaultType,
	};

	// 結構化資料 (JSON-LD)
	const structuredData = {
		"@context": "https://schema.org",
		"@type": article ? "BlogPosting" : "WebSite",
		"@id": seo.url,
		url: seo.url,
		name: seo.title,
		description: seo.description,
		image: seo.image,
		author: {
			"@type": "Person",
			name: author,
		},
		publisher: {
			"@type": "Organization",
			name: defaultTitle,
			logo: {
				"@type": "ImageObject",
				url: `${siteUrl}${defaultImage}`,
			},
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": seo.url,
		},
		headline: title,
		inLanguage: language,
	};

	// 如果是文章，加入發佈和修改日期
	if (article && publishedDate) {
		structuredData.datePublished = publishedDate;
		if (modifiedDate) {
			structuredData.dateModified = modifiedDate;
		}
		if (tags.length > 0) {
			structuredData.keywords = tags;
		}
	}

	return (
		<>
			{/* 基本 meta 標籤 */}
			<title>{seo.title}</title>
			<meta name="description" content={seo.description} />
			<meta name="keywords" content={seo.keywords} />
			<meta name="author" content={author} />
			<meta name="language" content={language} />

			{/* Open Graph */}
			<meta property="og:title" content={seo.title} />
			<meta property="og:description" content={seo.description} />
			<meta property="og:image" content={seo.image} />
			<meta property="og:url" content={seo.url} />
			<meta property="og:type" content={seo.type} />
			<meta property="og:locale" content={locale} />
			<meta property="og:site_name" content={defaultTitle} />

			{/* Twitter Card
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={seo.title} />
			<meta name="twitter:description" content={seo.description} />
			<meta name="twitter:image" content={seo.image} />
			{twitterUsername && (
				<meta name="twitter:creator" content={twitterUsername} />
			)} */}

			{/* 文章特定的 meta 標籤 */}
			{article && publishedDate && (
				<>
					<meta property="article:published_time" content={publishedDate} />
					<meta property="article:author" content={author} />
				</>
			)}
			{article && modifiedDate && (
				<meta property="article:modified_time" content={modifiedDate} />
			)}
			{article &&
				tags.length > 0 &&
				tags.map((tag) => (
					<meta key={tag} property="article:tag" content={tag} />
				))}

			{/* 額外的 SEO meta 標籤 */}
			<meta name="robots" content="index, follow" />
			<meta name="googlebot" content="index, follow" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />

			{/* 結構化資料 */}
			<script type="application/ld+json">
				{JSON.stringify(structuredData)}
			</script>

			{/* 額外的 children */}
			{children}
		</>
	);
};

Seo.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	image: PropTypes.string,
	pathname: PropTypes.string,
	article: PropTypes.bool,
	publishedDate: PropTypes.string,
	modifiedDate: PropTypes.string,
	tags: PropTypes.arrayOf(PropTypes.string),
	children: PropTypes.node,
};

export default Seo;
