import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import Signinandsignup from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Auth0ProviderWithHistory from "./context/Auth0ProviderWithHistory";
import { AuthAdapterProvider } from "./context/AuthAdapterContext";

const App = (props) => {
  return (
    <div>
      <Auth0ProviderWithHistory>
        <AuthAdapterProvider>
          <Header hidden />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route path="/shop" component={ShopPage} />
            <Route
              exact
              path="/signin"
              render={() =>
                props.currentUser ? <Redirect to="/" /> : <Signinandsignup />
              }
            />
          </Switch>
        </AuthAdapterProvider>
      </Auth0ProviderWithHistory>
    </div>
  );
};
export default App;
