import React from "react";
import CollectionsOverview from "../../components/collections-overview/CollectionsOverview";
import { Route } from "react-router-dom";
import CollectionPage from "../../components/collection/collectionPage";
import { ShopDataAdapterContext } from "../../context/ShopDataAdapterContext";
import shopService from "../../services/shop/shop";

const ShopPage = ({ match }) => {
  return (
    <ShopDataAdapterContext.Provider value={shopService}>
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          exact
          path={`${match.path}/:collectionID`}
          component={CollectionPage}
        />
      </div>
    </ShopDataAdapterContext.Provider>
  );
};

export default ShopPage;
