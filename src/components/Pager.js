import React, { useState } from "react";
import * as styles from "../styles/tech-page.module.scss";

const Pager = ({ allItem, setAllItem, allmarkdownArticle, perPage }) => {
  let totalPages = Math.ceil(allmarkdownArticle.length / perPage);
  const [currentPage, setCurrentPage] = useState(1);
  const { pageButton, pagination } = styles;

  const pageHandler = (e) => {
    let targetValue = e.target.value;
    setCurrentPage(targetValue);
    setAllItem(
      allmarkdownArticle.slice(
        (targetValue - 1) * perPage,
        perPage * targetValue
      )
    );
  };

  return (
    <ul className={pagination}>
      {Array.from({ length: totalPages }, (el, index) => (
        <li
          className={pageButton}
          key={index}
          value={index + 1}
          onClick={pageHandler}
          role="button"
          tabIndex={index + 1}
        >
          {index + 1}
        </li>
      ))}
    </ul>
  );
};

export default Pager;
