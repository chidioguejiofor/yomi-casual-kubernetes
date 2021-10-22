import React from "react";
import CollectionPreview from "../collection-preview/collection-preview";
import "./collectionsOverview.styles.scss";
import { useRetrieveProductCategory } from "../../hooks/shopHooks";

const CollectionsOverview = () => {
  const { collections } = useRetrieveProductCategory();

  console.log(collections, "<=====collections");
  return (
    <div className="collections-overview">
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

export default CollectionsOverview;
