import styles from './index.module.css'
import React from 'react';
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useSelector } from "react-redux";

const HeaderCart = () => {
  let pizzasInCart = useSelector(state => state.cart.pizzas)
  const count = Object.values(pizzasInCart).reduce((acc, curr) => acc + curr.qty, 0)

  return (
    <Link to="/cart" className={ styles.headerCart }>
      <ShoppingCartIcon className={ styles.headerCart__icon }/>
      <span className={ styles.headerCart__label }>Cart</span>
      {!!count && (
        <span className={ styles.headerCart__count }>({count})</span>
      )}
    </Link>
  )
}

export default HeaderCart


