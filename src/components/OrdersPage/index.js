import styles from './index.module.css'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {getOrdersByUser} from "../../redux/actions/order";
import OrderItem from "./OrderItem";

const OrdersPage = () => {
  const dispatch = useDispatch()
  const ordersData = useSelector(state => state.orders.data)
  const email = useSelector(state => state.user.user?.email)
  const { orders = [], pizzasInOrder = {}, pizzas = {} } = ordersData

  useEffect(() => {
    dispatch(getOrdersByUser(email))
  }, [email])

  if (!orders.length) {
    return (
      <h1 className="main-title">No orders</h1>
    )
  }

  return (
    <div className={ styles.cartPage }>
      <h1 className="main-title">My Orders</h1>

      <ul>
        {orders.map(order => (
          <OrderItem
            key={ order.order_id }
            date={ order.created_at }
            name={ order.name }
            phone={ order.phone }
            id={ order.order_id }
            orderEmail={ order.order_email }
            pizzasByOrder={ pizzasInOrder[order.order_id] }
            pizzas={ pizzas }
            qty={ pizzas.qty }
            total={ order.total }
            currency={ order.currency }
          />
        ))}
      </ul>
    </div>
  )
}

export default OrdersPage
