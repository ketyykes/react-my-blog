import * as React from "react";
import _ from "lodash";
import { graphql, Link } from "gatsby";
import { Layout, Seo } from "../components";
import { Button } from "@mui/material/";
import LabelIcon from "@mui/icons-material/Label";
import { AnchorLink } from "gatsby-plugin-anchor-links";

const TagsPage = ({
	data: {
		allMarkdownRemark: { group },
	},
}) => {
	return (
		<Layout banner={true}>
			{/* <AnchorLink to="#test" title="Our team">
				<span>Check out our team!</span>
			</AnchorLink> */}
			{group.map((el, index) => {
				const tagPath = `/tags/${_.kebabCase(el.fieldValue)}/`;
				return (
					<Button
						key={index}
						variant="contained"
						startIcon={<LabelIcon />}
						sx={{ background: "#4296d1e0", m: 1, textTransform: "none" }}
					>
						<Link to={tagPath} style={{ color: "#ffffff" }}>
							{el.fieldValue} ( {el.totalCount} )
						</Link>
					</Button>
				);
			})}
			{/* <div id="test">測試</div> */}
		</Layout>
	);
};

export default TagsPage;

export const Head = () => <Seo title="Tags" />;

export const tagPageQuery = graphql`
	query TagsQuery {
		site {
			siteMetadata {
				title
			}
		}
		allMarkdownRemark(limit: 1000) {
			group(field: frontmatter___tags) {
				fieldValue
				totalCount
			}
		}
	}
`;
