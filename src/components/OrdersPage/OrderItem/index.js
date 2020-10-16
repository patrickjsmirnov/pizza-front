import styles from './index.module.css'
import React, { memo } from 'react';
import { format } from 'date-fns'

const OrderItem = ({ date, name, phone, orderEmail, pizzasByOrder, pizzas }) => (
  <li className={ styles.orderItem }>
    <div className={ styles.orderItem__order_info }>
      <div className={ styles.orderItem__date }>{format(new Date(date), 'dd LLL YYY')}</div>
      <div className={ styles.orderItem__name }>{name}</div>
      <div className={ styles.orderItem__phone }>{phone}</div>
      <div className={ styles.orderItem__email }>{orderEmail}</div>
    </div>
    <ul className={ styles.orderItem__pizza_list }>
      {Object.keys(pizzasByOrder).map(id => (
        pizzas[id] && (
          <li className={ styles.orderItem__pizza_item }>
            <span className={styles.orderItem__pizza_item_name }>{pizzas[id]?.name}</span>
            <span className={styles.orderItem__pizza_item_qty }>{`${pizzasByOrder[id]?.qty} items`}</span>
          </li>
        )))}
    </ul>
  </li>
)

export default memo(OrderItem)
