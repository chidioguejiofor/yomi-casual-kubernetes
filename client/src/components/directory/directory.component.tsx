import React from "react";
import MenuItem from "../menu-item/menu-item.component";

import "./directory.styles.scss";
import { useRetrieveProductCategory } from "../../hooks/shopHooks";

const Directory = () => {
  const { collections } = useRetrieveProductCategory();
  return (
    <div className="directory-menu">
      {collections.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </div>
  );
};

export default Directory;
