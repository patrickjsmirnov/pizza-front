import styles from './index.module.css'
import React, { useEffect, useContext, useMemo } from 'react';
import {useLocation} from "react-router-dom";
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { fetchPizza } from "../../redux/actions/pizzas";
import { addToCart } from "../../redux/actions/cart";
import {CurrencyContext} from "../../context/currencyContext";
import {getOrdersByUser} from "../../redux/actions/order";


export default function OrdersPage(props) {
  const dispatch = useDispatch()
  const orders = useSelector(state => state.orders.data)
  const email = useSelector(state => state.user.user?.email)

  const history = useHistory();

  useEffect(() => {
    dispatch(getOrdersByUser(email))
  }, [email])


  if (!orders.length) {
    return (
      <h1>
        No orders
      </h1>
    )
  }


  return (
    <div className={ styles.cartPage }>
      <h1>Orders</h1>

      {orders.map(order => (
        <div>
          {order.first_name}
        </div>
      ))}



    </div>
  )
}
