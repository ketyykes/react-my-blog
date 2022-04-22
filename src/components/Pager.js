import React from "react";
import * as styles from "../styles/components-styles/pager.module.scss";
import { Link } from "gatsby";

const Pager = ({ currentPage, allmarkdownArticle, perPage }) => {
  let totalPages = Math.ceil(allmarkdownArticle.length / perPage);
  const { pageButton, pagination, pageButtonCurrent } = styles;

  return (
    <ul className={pagination}>
      {Array.from({ length: totalPages }, (_, index) => (
        <Link
          className={`${currentPage == index + 1 ? pageButtonCurrent : ""}
            ${pageButton}
            `}
          key={index}
          to={index === 0 ? `/tech-page/` : `/tech-page/${index + 1}`}
        >
          {index + 1}
        </Link>
      ))}
    </ul>
  );
};

export default Pager;
