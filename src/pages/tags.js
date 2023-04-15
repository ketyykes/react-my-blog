import * as React from "react";
import _ from "lodash";
import { graphql, Link } from "gatsby";
import { Layout, Seo } from "../components";
import { Button } from "@mui/material/";
import LabelIcon from "@mui/icons-material/Label";

const TagsPage = ({
	data: {
		allMarkdownRemark: { group },
	},
}) => {
	console.log(group);
	return (
		<Layout banner={true}>
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
