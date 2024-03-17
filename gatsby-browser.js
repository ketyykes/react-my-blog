const React = require("react");

const Layout = require("./src/components/layout/Layout").default;

exports.wrapPageElement = ({ element, props }) => {
	const pathsWithBanner = ["/photo/", "/", "/tags/"];
	const banner = pathsWithBanner.includes(props.location.pathname);
	return (
		<Layout banner={banner} {...props}>
			{element}
		</Layout>
	);
};
