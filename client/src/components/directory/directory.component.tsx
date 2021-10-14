import React from "react";
import MenuItem from "../menu-item/menu-item.component";

import "./directory.styles.scss";
import { useRetrieveCollections } from "../../hooks/shopHooks";

const Directory = () => {
  const { collections } = useRetrieveCollections();
  return (
    <div className="directory-menu">
      {collections.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </div>
  );
};

export default Directory;
