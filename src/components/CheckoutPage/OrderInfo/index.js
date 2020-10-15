import styles from './index.module.css'
import React, { memo } from 'react';

const OrderInfo = ({ pizzasInCart, total, currency }) => (
  <div className={ styles.orderInfo }>
    <h2 className={ styles.orderInfo__title }>Your Order</h2>
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
      <li className={ styles.orderInfo__item } key={ 1000 }>
        <span className={ styles.orderInfo__delivery }>Delivery</span>
        <span>{currency.sign}{currency.value === 0 ? 20 : 15}</span>
      </li>

      <li className={ styles.orderInfo__item } key={ 1001 }>
        <span className={ styles.orderInfo__delivery }>Total</span>
        <span>{currency.sign}{total}</span>
      </li>
    </ul>
  </div>
)


export default memo(OrderInfo)
