import styles from './index.module.css'
import React, { useEffect, useContext, useMemo, memo } from 'react';
import {useLocation} from "react-router-dom";
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from "react-redux";

// import { addToCart } from "../../redux/actions/cart";
import {CurrencyContext} from "../../../context/currencyContext";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

// import CartItem from "./CartItem";

const OrderInfo = (props) => {
  const dispatch = useDispatch()
  let pizzasInCart = useSelector(state => state.cart.pizzas)
  pizzasInCart = Object.values(pizzasInCart)
  const { currency } = useContext(CurrencyContext);
  const count = pizzasInCart.length

  const total = useMemo(() => getTotal(pizzasInCart), [pizzasInCart])

  function getTotal(pizzas) {
    return pizzas.reduce((acc, curr) => acc + curr[`price_${currency.name}`] * curr.qty, 0)
  }


  return (
    <div className={ styles.orderInfo }>
      <ul className={ styles.orderInfo__list }>
        {pizzasInCart.map(pizza => (
          <li className={ styles.orderInfo__item } key={ pizza.id }>
            <div className={ styles.orderInfo__item__info }>
              <span className={ styles.orderInfo__item__name }>{pizza.name}</span>
              <span className={ styles.orderInfo__item__qty }>QTY: {pizza.qty}</span>
            </div>
            <span>{currency.sign}{pizza[`price_${currency.name}`]}</span>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default memo(OrderInfo)
