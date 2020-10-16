import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

import PizzasList from "../PizzasList";
import PizzaDetailPage from '../PizzaDetailPage';

const PizzasContainer = () => {
  return (
    <div className="pizzas-menu">
      <Router>
        <Switch>
          <Route exact={ true } path="/" component={ withRouter(PizzasList) }/>
          <Route exact={ true } path={`/:id`} component={ withRouter(PizzaDetailPage) }/>
        </Switch>
      </Router>
    </div>
  )
}

export default withRouter(PizzasContainer);


