import './App.css';
import React, { useState } from 'react';
import {Route, Switch, withRouter} from "react-router-dom";
import PizzasList from "./components/PizzasList";
import PizzaDetailPage from "./components/PizzaDetailPage";
import Header from "./components/Header";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import OrdersPage from "./components/OrdersPage";
import { CurrencyContext, currencies } from "./context/currencyContext";

const App = () => {
  const [currency, setCurrency] = useState(currencies.usd);

  function toggleCurrency(currency) {
    setCurrency(currencies[currency])
  }

  return (
    <div className="App">
      <CurrencyContext.Provider value={{ currency, toggleCurrency }}>
        <Header/>
        <main className="App-main">
          <Switch>
            <Route exact={ true } path="/" component={ withRouter(PizzasList) }/>
            <Route path={`/pizza/:id`} component={ withRouter(PizzaDetailPage) }/>
            <Route path="/cart" component={ withRouter(CartPage) }/>
            <Route path="/checkout" component={ withRouter(CheckoutPage) }/>
            <Route path="/orders" component={ withRouter(OrdersPage) }/>
          </Switch>
        </main>

      </CurrencyContext.Provider>
    </div>
  );
}

export default withRouter(App);
