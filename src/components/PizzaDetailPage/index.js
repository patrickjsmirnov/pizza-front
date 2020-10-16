import styles from './index.module.css'
import React, { useEffect, useContext } from 'react';
import {useLocation} from "react-router-dom";
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { fetchPizza } from "../../redux/actions/pizzas";
import { addToCart } from "../../redux/actions/cart";
import {CurrencyContext} from "../../context/currencyContext";

const PizzaDetailPage = props => {
  const location = useLocation()
  const id = location.pathname.split('/')[2]
  const dispatch = useDispatch()
  const history = useHistory()
  const pizzaDetail = useSelector(state => state.pizzaDetail)
  const cart = useSelector(state => state.cart.pizzas[id])
  const { pizza, state } = pizzaDetail
  const { isFetching, isFailure } = state
  const { currency } = useContext(CurrencyContext);


  // fetch pizza data on mount
  useEffect(() => {
    dispatch(fetchPizza(id))
  }, [])

  function handleAddToCart() {
    dispatch(addToCart(pizza))
  }

  function proceedToCart() {
    history.push('/cart')
  }

  if (isFetching) {
    return (
      <span>Loading....</span>
    )
  }

  if (isFailure) {
    return (
      <span>Sorry, something went wrong</span>
    )
  }

  const qty = cart?.qty

  return (
    <div className={ styles.productPage }>
        <img src={ pizza.url } alt="" className={ styles.productPage__img }/>
        <div className={ styles.productPage__about }>
          <h1 className={ styles.productPage__name }>
            {pizza.name}
          </h1>
          <p className={ styles.productPage__description }>
            {pizza.description}
          </p>
          <div className={ styles.productPage__cost }>
            <span>Price: </span>
            {currency.sign}
            {currency.value === 0 ? pizza.price_usd : pizza.price_eur}
          </div>
          <Button variant="contained" color="secondary" onClick={ handleAddToCart }>
            <ShoppingCartIcon className={ styles.productPage__cart_icon }/> Add To Cart
            {!!qty && ` (${qty})`}
          </Button>

          <br/>

          <Button
            className={ styles.productPage__btn_view_cart  }
            variant="contained"
            color="primary"
            onClick={ proceedToCart }
          >
            View Cart
          </Button>
        </div>
    </div>
  )
}

export default PizzaDetailPage
