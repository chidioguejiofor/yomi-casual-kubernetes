import React from "react";
import CollectionPreview from "../collection-preview/collection-preview";
import "./collectionsOverview.styles.scss";
import shopService from "../../services/shop/shop";
import useRetrieveCollections from "../../hooks/shopHooks";

const CollectionsOverview = () => {
  const { collections } = useRetrieveCollections();
  return (
    <div className="collections-overview">
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

export default CollectionsOverview;
