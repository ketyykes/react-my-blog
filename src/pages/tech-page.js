import React, { useState } from "react";
import Layout from "../components/Layout";
import Pager from "../components/Pager";

import { graphql, Link } from "gatsby";
import * as styles from "../styles/tech-page.module.scss";
const dayjs = require("dayjs");

const TechPage = ({ data }) => {
  const { content, card, pageButton, pagination } = styles;
  let perPage = 4;
  // const [allItem ,setAllItem] = useState(data.allMarkdownRemark.nodes);
  // const allItem =  data.allMarkdownRemark.nodes;

  

  const allmarkdownArticle = data.allMarkdownRemark.nodes;

  const [currentPage, setCurrentPage] = useState(1);
  const [markdownArticle, setMarkdownArticle] = useState(
    allmarkdownArticle.slice((currentPage - 1) * perPage, perPage * currentPage)
  );
  let totalPages = Math.ceil(allmarkdownArticle.length / perPage);
  const pageHandler = (e) => {
    let targetValue = e.target.value;
    setCurrentPage(targetValue);
    setMarkdownArticle(
      data.allMarkdownRemark.nodes.slice(
        (targetValue - 1) * perPage,
        perPage * targetValue
      )
    );
  };
  return (
    <>
      <Layout>
        <div className={content}>
          {markdownArticle.map((article, index) => (
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
          <ul className={pagination}>
            {Array.from({ length: totalPages }, (el, index) => (
              <li
                className={pageButton}
                key={index}
                value={index + 1}
                onClick={pageHandler}
                role = "button"  tabIndex={index + 1}
              >
                {index + 1}
              </li>
            ))}
          </ul>
              {/* <Pager allItem={allItem} setAllItem={setAllItem} /> */}

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
