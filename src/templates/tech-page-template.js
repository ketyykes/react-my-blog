import React, { useState } from "react";
import { Layout, Pager, Seo } from "../components";
import { graphql, Link } from "gatsby";
import {
  content,
  card,
} from "../styles/templates-styles/tech-page.module.scss";

const dayjs = require("dayjs");
const TechPageTemplate = ({ pageContext, data }) => {
  const allmarkdownArticle = data.allMarkdownRemark.nodes;
  const { perPage, currentPage } = pageContext;
  const [allItem, setAllItem] = useState(
    allmarkdownArticle.slice(perPage * (currentPage - 1), perPage * currentPage)
  );
  return (
    <Layout>
      <div className={content}>
        {allItem.map((article) => (
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
        <Pager
          allItem={allItem}
          setAllItem={setAllItem}
          allmarkdownArticle={allmarkdownArticle}
          perPage={perPage}
          currentPage={currentPage}
        />
      </div>
    </Layout>
  );
};

export default TechPageTemplate;
export const Head = () => <Seo title="Tech-page" />;
export const query = graphql`
  {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        frontmatter {
          title
          date
        }
        id
      }
    }
  }
`;
