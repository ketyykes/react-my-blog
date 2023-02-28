import React from "react";
import { Layout, Seo, Album } from "../components";

const Photo = () => {
	return (
		<Layout>
			<Album />
		</Layout>
	);
};

export default Photo;
export const Head = () => <Seo title="Photo" />;
