import React, { useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, withRouter} from "react-router-dom";
import PizzasList from "./components/PizzasList";
import PizzaDetailPage from "./components/PizzaDetailPage";
import Header from "./components/Header";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import { CurrencyContext, currencies } from "./context/currencyContext";

function App() {
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
          </Switch>
        </main>

      </CurrencyContext.Provider>
    </div>
  );
}

export default withRouter(App);
