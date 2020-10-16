import styles from './index.module.css'
import React, { useContext, useMemo } from 'react';
import Button from '@material-ui/core/Button';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {CurrencyContext} from "../../context/currencyContext";

import CartItem from "./CartItem";

const CartPage = props => {
  let pizzasInCart = useSelector(state => state.cart.pizzas)
  pizzasInCart = Object.values(pizzasInCart)
  const { currency } = useContext(CurrencyContext);
  const count = pizzasInCart.length
  const history = useHistory();
  const total = useMemo(() => getTotal(pizzasInCart), [pizzasInCart])

  function getTotal(pizzas) {
    return pizzas.reduce((acc, curr) => acc + curr[`price_${currency.name}`] * curr.qty, 0)
  }

  if (!count) {
    return <h1 className={ styles.cartPage__title }>Cart is Empty!</h1>
  }

  return (
    <div className={ styles.cartPage }>
      <h1 className={ styles.cartPage__title }>Cart</h1>

      <div className={ styles.cartPage__content }>
        <ul className={ styles.cartPage__list }>
          {pizzasInCart.map(pizza => (
            <CartItem
              name={ pizza.name }
              id={ pizza.id }
              description={ pizza.description }
              url={ pizza.url }
              priceUsd={ pizza.price_usd }
              priceEur={ pizza.price_eur }
              key={ pizza.id }
              qty={ pizza.qty }
            />
          ))}
        </ul>

        <p className={ styles.cartPage__total }>Total: {`${currency.sign} ${total}`}</p>

        <Button
          className={ styles.cartPage__checkout_btn }
          onClick={ () => history.push("/checkout") }
          variant="contained"
          color="primary"
        >
          Proceed to Checkout
        </Button>
      </div>

    </div>
  )
}

export default CartPage
