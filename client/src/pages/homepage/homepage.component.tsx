import React from "react";
import shopService from "../../services/shop/shop";
import { Directory, ShopDataAdapterContext } from "../../components/directory";

import "./homepage.styles.scss";

const HomePage = () => (
  <ShopDataAdapterContext.Provider value={shopService}>
    <div className="homepage">
      <Directory />
    </div>
  </ShopDataAdapterContext.Provider>
);

export default HomePage;
