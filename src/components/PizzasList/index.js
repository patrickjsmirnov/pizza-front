import styles from './index.module.css'
import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPizzas } from "../../redux/actions/pizzas";
import PizzaCard from "../PizzaCard";
import PizzasSortSelect from "../PizzasSortSelect";
import {CurrencyContext} from "../../context/currencyContext";

const SORTING = {
  PRICE_MIN: {
    value: 0,
    label: 'Price: Low to High'
  },
  PRICE_MAX: {
    value: 1,
    label: 'Price: High to Low'
  }
}

const PizzasList = () => {
  const dispatch = useDispatch()
  const pizzas = useSelector(state => state.pizzas.pizzas)
  const [sorting, setSorting] = useState(SORTING.PRICE_MIN.value)
  const { currency } = useContext(CurrencyContext);

  useEffect(() => {
    dispatch(fetchPizzas())
  }, [])

  const sortingPizzas = useMemo(
    () => sortPizza(currency, sorting, pizzas),
    [currency, sorting, pizzas])

  function sortPizza() {
    const price = `price_${currency.name}`

    return pizzas.sort((a, b) => {
      return sorting ? b[price] - a[price] : a[price] - b[price]
    })
  }

  return (
    <div className="pizzas-menu">
      <h1 className="main-title">All Pizza</h1>

      <div className={ styles.pizzasList__actions }>
        <PizzasSortSelect
          value={ sorting }
          options={ SORTING }
          setSorting={ setSorting }
        />
      </div>

      <div className={ styles.pizzasList }>
        {sortingPizzas.map(pizza => (
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


