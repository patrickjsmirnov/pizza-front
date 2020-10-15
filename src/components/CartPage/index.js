import styles from './index.module.css'
import React, { useEffect, useContext, useMemo } from 'react';
import {useLocation} from "react-router-dom";
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { fetchPizza } from "../../redux/actions/pizzas";
import { addToCart } from "../../redux/actions/cart";
import {CurrencyContext} from "../../context/currencyContext";

import CartItem from "./CartItem";

export default function CartPage(props) {
  const dispatch = useDispatch()
  let pizzasInCart = useSelector(state => state.cart.pizzas)
  pizzasInCart = Object.values(pizzasInCart)
  const { currency } = useContext(CurrencyContext);
  const count = pizzasInCart.length
  console.log('currency: ', currency)

  const history = useHistory();

  function handleClick() {
    history.push("/checkout");
  }

  const total = useMemo(() => getTotal(pizzasInCart), [pizzasInCart])

  function getTotal(pizzas) {
    return pizzas.reduce((acc, curr) => acc + curr[`price_${currency.name}`] * curr.qty, 0)
  }

  if (!count) {
    return (
      <h1 className={ styles.cartPage__title }>Cart is Empty!</h1>
    )
  }


  return (
    <div className={ styles.cartPage }>
      <h1 className={ styles.cartPage__title }>Cart</h1>
      <ul className={ styles.cartPage__list }>
        {pizzasInCart.map(pizza => (
          <CartItem { ...pizza } key={ pizza.id } />
        ))}
      </ul>

      <p>Total: {`${currency.sign} ${total}`}</p>

      <Button onClick={ handleClick } variant="contained" color="secondary">
        Proceed to Checkout
      </Button>

    </div>
  )
}
