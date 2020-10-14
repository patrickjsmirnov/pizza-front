import styles from './index.module.css'
import React, { useEffect, useContext } from 'react';
import {useLocation} from "react-router-dom";
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from "react-redux";

import { fetchPizza } from "../../redux/actions/pizzas";
import { addToCart } from "../../redux/actions/cart";
import {CurrencyContext} from "../../context/currencyContext";

export default function PizzaDetailPage(props) {
  const location = useLocation()
  const id = location.pathname.split('/')[2]
  const dispatch = useDispatch()
  const pizzaDetail = useSelector(state => state.pizzaDetail)
  const cart = useSelector(state => state.cart.pizzas[id])
  const { pizza, state } = pizzaDetail
  const { isFetching, isSuccess, isFailure } = state

  const { currency } = useContext(CurrencyContext);


  // fetch pizza data
  useEffect(() => {
    dispatch(fetchPizza(id))
  }, [])

  // add to cart
  function handleAddToCart() {
    dispatch(addToCart(pizza))
  }


  if (isFetching) {
    return (
      <span>Loading....</span>
    )
  }

  const qty = cart?.qty

  return (
    <div className={ styles.productPage }>
        <img src={ pizza.url } alt="" className={ styles.productPage__img }/>

        <div className={ styles.productPage__about }>
          <h1 className={ styles.productPage__name }>
            {pizza.name}
          </h1>
          <p className={ styles.productPage__description }>
            {pizza.description}
          </p>

          <div className={ styles.productPage__cost }>
            {currency.sign}
            {currency.value === 0 ? pizza.price_usd : pizza.price_eur}
          </div>

          <Button variant="contained" color="secondary" onClick={ handleAddToCart }>
            Add To Cart
            {!!qty && ` (${qty})`}
          </Button>
        </div>
    </div>
  )

}
