import styles from './index.module.css'
import React, { memo } from 'react';
import PropTypes from 'prop-types'

const OrderInfo = ({ pizzasInCart, total, currency, deliveryCost }) => (
  <div className={ styles.orderInfo }>
    <h2 className={ styles.orderInfo__title }>Your Order</h2>
    <ul className={ styles.orderInfo__list }>
      {pizzasInCart.map(pizza => (
        <li className={ styles.orderInfo__item } key={ pizza.id }>
          <div className={ styles.orderInfo__item__info }>
            <span className={ styles.orderInfo__item__name }>{pizza.name}</span>
            <span className={ styles.orderInfo__item__qty }>Items: {pizza.qty}</span>
          </div>
          <span className={ styles.orderInfo__item__price }>
            {currency.sign}{pizza[`price_${currency.name}`] * pizza.qty}
          </span>
        </li>
      ))}

      <li className={ `${styles.orderInfo__item} ${styles.orderInfo__item__delivery}` } key={ 1000 }>
        <span className={ styles.orderInfo__delivery }>Delivery</span>
        <span className={ styles.orderInfo__item__price }>
          {currency.sign}{deliveryCost}
        </span>
      </li>

      <li className={ `${styles.orderInfo__item} ${styles.orderInfo__item__total}` } key={ 1001 }>
        <span className={ styles.orderInfo__delivery }>Total</span>
        <span className={ styles.orderInfo__item__price }>
          {currency.sign}{total}
        </span>
      </li>
    </ul>
  </div>
)

export default memo(OrderInfo)

OrderInfo.propTypes = {
  total: PropTypes.number.isRequired,
  pizzasInCart: PropTypes.array.isRequired,
  currency: PropTypes.string.isRequired,
  deliveryCost: PropTypes.number.isRequired
}
