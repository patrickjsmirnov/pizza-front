import styles from './index.module.css'
import React, {useContext, useState, useEffect, useMemo} from 'react';
import TextField from '@material-ui/core/TextField';
import OrderInfo from "./OrderInfo";
import Button from '@material-ui/core/Button';

import { useDispatch, useSelector } from "react-redux";
import {CurrencyContext} from "../../context/currencyContext";
import { createOrder } from "../../redux/actions/order";
import { emptyCart } from "../../redux/actions/cart";
import { Formik } from 'formik';
import OrderCreatedModal from "../OrderCreatedModal";
import { usePrevious } from "../../hooks/usePrevious";

const DELIVERY_COST = {
  usd: 20,
  eur: 15
}

const CheckoutPage = () => {
  const dispatch = useDispatch()
  let pizzasInCart = useSelector(state => state.cart.pizzas)
  const user = useSelector(state => state.user.user)

  const createOrderState = useSelector(state => state.createOrder.state)
  const createOrderPreviousState = usePrevious(createOrderState) || {}

  pizzasInCart = Object.values(pizzasInCart)
  const { currency } = useContext(CurrencyContext);
  const [isOpen, setIsOpen] = useState(false)
  const total = useMemo(() => getTotal(pizzasInCart), [pizzasInCart])


  function getTotal(pizzas) {
    return pizzas
      .reduce((acc, curr) => acc + curr[`price_${currency.name}`] * curr.qty, 0) + DELIVERY_COST[currency.name]
  }

  function handleCompleteOrder(orderData) {
    dispatch(createOrder(orderData))
    dispatch(emptyCart())
  }

  useEffect(() => {
    if (createOrderPreviousState.isFetching && createOrderState.isSuccess) {
      setIsOpen(true)
    }
  }, [createOrderState])

  return (
    <div className={ styles.checkoutPage }>
      <h1 className={ styles.checkoutPage__title }>Checkout</h1>

      <OrderCreatedModal isOpen={ isOpen }/>

      <div className={ styles.checkoutPage__content }>
        <Formik
          initialValues={{ email: '', name: '', address: '', phone: '' }}
          validate={values => {
            const errors = {};

            if (!values.email) errors.email = 'Required';

            if (!values.phone) errors.phone = 'Required';

            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
            }

            if (!/^[0-9 ()+-]+$/.test(values.phone)) {
              errors.phone = 'Invalid phone';
            }

            if (!pizzasInCart.length) {
              errors.order = 'Order is Empty'
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const orderData = {
              ...values,
              pizzas: pizzasInCart,
              user_email: user.email || ''
            }

            handleCompleteOrder(orderData)
          }}
        >
          {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
            <form onSubmit={handleSubmit} className={ styles.checkoutPage__form }>
              <TextField
                className={ styles.checkoutPage__input }
                label="Name"
                variant="outlined"
                required={ true }
                name="name"
                onChange={ handleChange }
                onBlur={handleBlur}
                value={values.name}
                placeholder="name"
              />

              <TextField
                className={ styles.checkoutPage__input }
                label="Email"
                variant="outlined"
                required={ true }
                name="email"
                onChange={ handleChange }
                value={values.email}
                onBlur={handleBlur}
                type="email"
              />

              <TextField
                className={ styles.checkoutPage__input }
                label="Phone"
                variant="outlined"
                required={ true }
                name="phone"
                onChange={ handleChange }
                value={values.phone}
                onBlur={handleBlur}
                type="tel"
                key={ 5 }
              />

              <TextField
                className={ styles.checkoutPage__input }
                label="Address"
                variant="outlined"
                required={ true }
                name="address"
                onChange={ handleChange }
                value={values.address}
                onBlur={handleBlur}
                key={ 4 }
              />

              <div className={ styles.checkoutPage__errors }>
                <span>{errors.email && touched.email && errors.email}</span>
                <span>{errors.phone && touched.phone && errors.phone}</span>
                <span>{errors.order && errors.order}</span>
              </div>

              <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                Submit
              </Button>

            </form>
          )}
        </Formik>


        <OrderInfo
          pizzasInCart={ pizzasInCart }
          total={ total }
          currency={ currency }
          deliveryCost={ DELIVERY_COST[currency.name] }
        />
      </div>

    </div>
  )
}

export default CheckoutPage
