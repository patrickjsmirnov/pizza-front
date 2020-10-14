import styles from './index.module.css'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPizzas } from "../../redux/actions/pizzas";
import { CurrencyContext } from '../../context/currencyContext'

import PizzaCard from "../PizzaCard";

const PizzasList = props => {
  const dispatch = useDispatch()

  const pizzas = useSelector(state => state.pizzas.pizzas)

  useEffect(() => {
    dispatch(fetchPizzas())
  }, [])

  return (
    <div className="pizzas-menu">
      <div className={ styles.pizzasList }>
        {pizzas.map(pizza => <PizzaCard { ...pizza } />)}
      </div>

    </div>
  )
}

export default PizzasList


