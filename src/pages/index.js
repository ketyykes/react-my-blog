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
		<Seo
			title="首頁"
			description="水土曜來了 - 技術部落格，專注於前端開發、React、JavaScript、TypeScript 等技術分享"
			pathname="/"
		/>
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
