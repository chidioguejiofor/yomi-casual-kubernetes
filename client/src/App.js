import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import Signinandsignup from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

const App = (props) => {
  return (
    <div>
      <Header />
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
    </div>
  );
};
export default App;
