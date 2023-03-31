import React from "react";
import { Layout, Seo, Album } from "../components";

const Photo = () => {
	return (
		<Layout banner={true}>
			<Album />
		</Layout>
	);
};

export default Photo;
export const Head = () => <Seo title="Photo" />;
