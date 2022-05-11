import React from "react";

import "./Pagination.scss";

const refUrl = (filter,sort)=>{
  let ref = `/filter/${filter ? `${JSON.stringify(filter)}` : '[]'}${ sort ? `/${sort}` : ''}`;
  return ref;
}

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage, compName, filter, sort }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const ref = compName === 'orderHistory'? `/account/${compName}/page`: `/${compName}/page`;
  return (
    <div className="pagination-container">
      {pageNumbers.map((num) => (
        <li key={num} style={{ display: "inline" }}>
          <a href={compName === 'orderHistory'? `${ref}/${num}` : `${ref}/${num}${filter || sort ? `${refUrl(filter,sort)}` : ''}`}
            onClick={() => paginate(num)}
            className={`num ${currentPage === num ? "active" : ""}`}
          >
            {num}
          </a>
        </li>
      ))}
    </div>
  );
};

export default Pagination;
