import React from "react";
import "./collectionPage.styles.scss";
import CollectionItem from "../collection-item/collection-item.component";
import NewCollectionItem from "../collection-item/new-collection-item";
import { useRetrieveProducts } from "../../hooks/shopHooks";

const CollectionPage = (props) => {
  const categoryId = props.match.params.collectionID;
  const { products, loading, category } = useRetrieveProducts(categoryId);

  const handleCreate = (values) => {};
  return (
    <div className="collection-page">
      <h2 className="title">{category?.title}</h2>
      <div className="items">
        <>
          <NewCollectionItem onCreate={handleCreate} />
          {products.map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
        </>
      </div>
    </div>
  );
};

export default CollectionPage;
