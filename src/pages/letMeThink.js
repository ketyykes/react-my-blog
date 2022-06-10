import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import Pager from "../components/pager/Pager";
import { graphql, Link } from "gatsby";
import * as styles from "../styles/templates-styles/tech-page.module.scss";
const dayjs = require("dayjs");

const TechPage = ({ data }) => {
  const { content, card } = styles;
  let perPage = 10;
  const allmarkdownArticle = data.allMarkdownRemark.nodes;
  const [allItem, setAllItem] = useState(
    allmarkdownArticle.slice(0 , perPage * 1)
  );
  return (
    <>
      <Layout>
        <div className={content}>
          {allItem.map((article, index) => (
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
            // allItem={allItem}
            // setAllItem={setAllItem}
            allmarkdownArticle={allmarkdownArticle}
            perPage={perPage}
          />
        </div>
      </Layout>
    </>
  );
};

export default TechPage;

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
