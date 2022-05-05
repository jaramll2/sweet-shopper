import React from "react";

import "./Pagination.scss";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-container">
      <ul>
        {pageNumbers.map((num) => (
          <li key={num} style={{ display: "inline" }}>
            <a
              onClick={() => paginate(num)}
              className={`num ${currentPage === num ? "active" : ""}`}
            >
              {num}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
