import React from "react";
import "./collectionPage.styles.scss";
import CollectionItem from "../collection-item/collection-item.component";
import NewCollectionItem from "../collection-item/new-collection-item";
import shopModel from "../../services/shop/shop";
const CollectionPage = (props) => {
  const collectionId = props.match.params.collectionID;

  const { items, title } = shopModel.getProductsInCollection(collectionId);
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        <>
          <NewCollectionItem />
          {items.map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
        </>
      </div>
    </div>
  );
};

export default CollectionPage;
