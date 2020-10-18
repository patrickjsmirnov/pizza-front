import styles from './index.module.css'
import React, { memo } from 'react';
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { currencies } from "../../../context/currencyContext";

const OrderItem = ({ date, name, phone, orderEmail, pizzasByOrder, pizzas, total, currency }) => (
  <li className={ styles.orderItem }>
    <div className={ styles.orderItem__order_info }>
      <div className={ styles.orderItem__date }>{format(new Date(date), 'dd LLL YYY')}</div>
      <div className={ styles.orderItem__name }>{name}</div>
      <div className={ styles.orderItem__phone }>{phone}</div>
      <div className={ styles.orderItem__email }>{orderEmail}</div>
      <div className={ styles.orderItem__total }>{`${currencies[currency].sign}${total}`}</div>
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


OrderItem.propTypes = {
  date: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  orderEmail: PropTypes.string.isRequired,
  pizzasByOrder: PropTypes.array.isRequired,
  pizzas: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired
}
