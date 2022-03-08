import React from "react";
import Layout from "../components/Layout";
import { graphql, Link } from "gatsby";
import * as styles from "../styles/tech-page.module.scss";
const dayjs = require("dayjs");

const techPage = ({ data }) => {
  // console.log(data.allMarkdownRemark.nodes);
  const markdownArticle = data.allMarkdownRemark.nodes;
  const { content, card } = styles;

  return (
    <>
      <Layout>
        <div className={content}>
          {markdownArticle.map((article) => (
            <div className={card} key={article.id}>
              <h3>
                <Link
                  to={
                    "/tech-page/" +
                    dayjs(article.frontmatter.date).format("YYYY-MM-DD ddd")
                  }
                >
                  {article.frontmatter.title}
                </Link>
              </h3>
              <p>{dayjs(article.frontmatter.date).format("YYYY-MM-DD ddd")}</p>
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default techPage;

export const query = graphql`
  {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        html
        frontmatter {
          title
          date
        }
        id
      }
    }
  }
`;
