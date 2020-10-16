import styles from './index.module.css'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPizzas } from "../../redux/actions/pizzas";
import PizzaCard from "../PizzaCard";

const PizzasList = props => {
  const dispatch = useDispatch()
  const pizzas = useSelector(state => state.pizzas.pizzas)

  useEffect(() => {
    dispatch(fetchPizzas())
  }, [])

  return (
    <div className="pizzas-menu">
      <h1>Catalog</h1>
      <div className={ styles.pizzasList }>
        {pizzas.map(pizza => (
          <PizzaCard
            key={ pizza.id }
            id={ pizza.id }
            name={ pizza.name }
            description={ pizza.description }
            url={ pizza.url }
            priceUsd={ pizza.price_usd }
            priceEur={ pizza.price_eur }
          />
        ))}
      </div>

    </div>
  )
}

export default PizzasList


