import React from "react";
import MenuItem from "../menu-item/menu-item.component";

import "./directory.styles.scss";
import shopService from "../../services/shop/shop";

const Directory = () => {
  const categories = shopService.getCollections();
  return (
    <div className="directory-menu">
      {categories.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </div>
  );
};

export default Directory;
