import styles from './index.module.css'
import React, { useEffect, useContext, useMemo } from 'react';
import {useLocation} from "react-router-dom";
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../../redux/actions/cart";
import {CurrencyContext} from "../../context/currencyContext";

// import CartItem from "./CartItem";

export default function CheckoutPage(props) {
  const dispatch = useDispatch()
  let pizzasInCart = useSelector(state => state.cart.pizzas)
  pizzasInCart = Object.values(pizzasInCart)
  const { currency } = useContext(CurrencyContext);
  const count = pizzasInCart.length
  console.log('currency: ', currency)

  const total = useMemo(() => getTotal(pizzasInCart), [pizzasInCart])

  function getTotal(pizzas) {
    return pizzas.reduce((acc, curr) => acc + curr[`price_${currency.name}`] * curr.qty, 0)
  }


  return (
    <div className={ styles.checkoutPage }>
      <h1 className={ styles.checkoutPage__title }>Checkout Page</h1>

    </div>
  )
}
