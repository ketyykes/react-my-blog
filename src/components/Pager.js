// import React, { useState } from "react";
// import * as styles from "../styles/tech-page.module.scss";

// const Pager = ({ allItem ,setAllItem}) => {
//   let perPage = 4;
//   console.log(allItem);

//   let totalPages = Math.ceil(allItem.length / perPage);
//   const [currentPage, setCurrentPage] = useState(1);
// //   const [markdownArticle, setMarkdownArticle] = useState(
// //     allItem.slice((currentPage - 1) * perPage, perPage * currentPage)
// //   );
//   const { content, card, pageButton, pagination } = styles;

//   const pageHandler = (e) => {
//     let targetValue = e.target.value;
//     setCurrentPage(targetValue);
//     setAllItem(
//       allItem.slice((targetValue - 1) * perPage, perPage * targetValue)
//     );
//   };

//   return (
//     <ul className={pagination}>
//       {Array.from({ length: totalPages }, (el, index) => (
//         <li
//           className={pageButton}
//           key={index}
//           value={index + 1}
//           onClick={pageHandler}
//           role="button"
//           tabIndex={index + 1}
//         >
//           {index + 1}
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default Pager;
