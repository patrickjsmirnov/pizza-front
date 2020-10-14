import React from 'react';
// import './App.css';
import { connect } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";

import PizzasList from "../PizzasList";
import PizzaDetailPage from '../PizzaDetailPage';

function PizzasContainer(props) {
  console.log('props: ', props)
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


