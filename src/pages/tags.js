import * as React from "react";
import _ from "lodash";
import { graphql, Link } from "gatsby";
import { Layout, Seo } from "../components";
import { Button, Container } from "@mui/material/";
import LabelIcon from "@mui/icons-material/Label";

const TagsPage = ({
	data: {
		allMarkdownRemark: { group },
	},
}) => {
	return (
		<Layout banner={true}>
			<Container maxWidth="false" sx={{ p: 10 }}>
				{group.map((el, index) => {
					const tagPath = `/tags/${_.kebabCase(el.fieldValue)}/`;
					return (
						<Button
							key={index}
							variant="contained"
							startIcon={<LabelIcon />}
							sx={{ background: "#4296d1e0", m: 1 }}
						>
							<Link to={tagPath} style={{ color: "#ffffff" }}>
								{el.fieldValue} ( {el.totalCount} )
							</Link>
						</Button>
					);
				})}
			</Container>
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
