import styles from './index.module.css'
import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPizzas } from "../../redux/actions/pizzas";
import PizzaCard from "../PizzaCard";
import PizzasSortSelect from "../PizzasSortSelect";
import {CurrencyContext} from "../../context/currencyContext";
import Spinner from '../Spinner'

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
  const pizzasState = useSelector(state => state.pizzas.state)
  const [sorting, setSorting] = useState(SORTING.PRICE_MIN.value)
  const { currency } = useContext(CurrencyContext);
  const { isFetching, isSuccess, isFailure } = pizzasState

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

      {isSuccess && (
        <div className={ styles.pizzasList__actions }>
          <PizzasSortSelect
            value={ sorting }
            options={ SORTING }
            setSorting={ setSorting }
          />
        </div>
      )}

      {isFailure && (
        <p>Sorry, something went wrong</p>
      )}

      {isFetching && (
        <Spinner/>
      )}

      {isSuccess && (
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
      )}
    </div>
  )
}

export default PizzasList


