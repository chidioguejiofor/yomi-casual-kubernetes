import React from "react";
import { withRouter } from "react-router-dom";

import "./menu-item.styles.scss";

const MenuItem = (props) => {
  const { title, imageUrl, size, history, slug } = props;

  const linkUrl = `/shop/${slug}`;

  return (
    <div className={`${size} menu-item`} onClick={() => history.push(linkUrl)}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="content">
        <h1 className="title">{title.toUpperCase()}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
};

export default withRouter(MenuItem);
