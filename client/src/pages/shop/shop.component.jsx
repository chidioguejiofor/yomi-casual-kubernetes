import React from 'react';
import CollectionsOverview from '../../components/collections-overview/CollectionsOverview';
import { Route } from 'react-router-dom';
import CollectionPage from '../../components/collection/collectionPage';
const ShopPage = ({ match }) => {
  return (
    <div className='shop-page'>
      <Route exact path={`${match.path}`} component={CollectionsOverview} />
      <Route
        exact
        path={`${match.path}/:collectionID`}
        component={CollectionPage}
      />
    </div>
  );
};

export default ShopPage;
