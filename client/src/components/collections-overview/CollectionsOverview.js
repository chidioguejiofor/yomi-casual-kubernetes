import React from "react";
import CollectionPreview from "../../components/collection-preview/collection-preview";
import "./collectionsOverview.styles.scss";
import shopService from "../../services/shop/shop";

const CollectionsOverview = () => {
  const collections = shopService.getCollections();

  return (
    <div className="collections-overview">
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

export default CollectionsOverview;
