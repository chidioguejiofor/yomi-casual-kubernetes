import React from "react";
import "./collectionPage.styles.scss";
import { connect } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selector";
import CollectionItem from "../collection-item/collection-item.component";
import NewCollectionItem from "../collection-item/new-collection-item";
const CollectionPage = ({ collection }) => {
  const { title, items } = collection;

  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        <>
          <NewCollectionItem/>
          {items.map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
        </>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionID)(state),
});

export default connect(mapStateToProps)(CollectionPage);
