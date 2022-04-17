import React from "react";
import { Link } from "react-router-dom";

import "./FooterColumn.scss";

export default ({ data }) => {
  const { title, items } = data;
  return (
    <div className="footer-column">
      <div className="column-title">{title}</div>
      <div className="column-items">
        {items.map((item) => (
          <Link className="column-item" to={item.url}>
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};
