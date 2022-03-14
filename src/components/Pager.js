import React, { useState } from "react";
import * as styles from "../styles/tech-page.module.scss";
import { Link } from "gatsby";

const Pager = ({
  allItem,
  setAllItem,
  currentPage,
  allmarkdownArticle,
  perPage,
}) => {
  let totalPages = Math.ceil(allmarkdownArticle.length / perPage);
  // const [currentPage, setCurrentPage] = useState(1);
  const { pageButton, pagination } = styles;

  // const pageHandler = (e) => {
  //   let targetValue = e.target.value;
  //   setCurrentPage(targetValue);
  //   setAllItem(
  //     allmarkdownArticle.slice(
  //       (targetValue - 1) * perPage,
  //       perPage * targetValue
  //     )
  //   );
  // };

  return (
    <ul className={pagination}>
      {Array.from({ length: totalPages }, (_, index) => (
        <Link
          className={pageButton}
          key={index}
          to={`/tech-page/blog/${index+1}`}
        >
          {index + 1}
        </Link>
      ))}
    </ul>
  );
};

export default Pager;
