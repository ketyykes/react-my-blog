import React from "react";
import { graphql } from "gatsby";
import { PortfolioTab } from "../components/index";
import Seo from "../components/seo/Seo";

const Index = ({ data }) => {
	return <PortfolioTab />;
};

export default Index;
export const Head = () => (
	<>
		<html lang="zh-Hant-TW" />
		<Seo title="Home" />;
	</>
);

//原先是給 slider 的 graphql
export const query = graphql`
	query QuerySlider {
		allFile(
			filter: {
				sourceInstanceName: { eq: "images" }
				relativeDirectory: { eq: "slider" }
			}
		) {
			nodes {
				relativePath
				relativeDirectory
			}
		}
	}
`;
