import styles from './index.module.css'
import React, {useContext, useMemo, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import OrderInfo from "./OrderInfo";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import { useDispatch, useSelector } from "react-redux";
import {CurrencyContext} from "../../context/currencyContext";
import { createOrder } from "../../redux/actions/order";

import { Formik } from 'formik';

const CheckoutPage = () => {
  const dispatch = useDispatch()
  let pizzasInCart = useSelector(state => state.cart.pizzas)
  pizzasInCart = Object.values(pizzasInCart)
  const { currency } = useContext(CurrencyContext);
  const count = pizzasInCart.length

  const total = useMemo(() => getTotal(pizzasInCart), [pizzasInCart])

  function getTotal(pizzas) {
    return pizzas.reduce((acc, curr) => acc + curr[`price_${currency.name}`] * curr.qty, 0)
  }

  // здесь будет отправка на заказ
  function handleSubmit(event) {
    event.preventDefault()
    console.log('handleSubmit')
  }

  return (
    <div className={ styles.checkoutPage }>
      <h1 className={ styles.checkoutPage__title }>Checkout</h1>

      <div className={ styles.checkoutPage__content }>
        <Formik
          initialValues={{ email: '', password: '', first_name: '', last_name: '', address: '' }}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              dispatch(createOrder(values))

              // alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
            <form onSubmit={handleSubmit} className={ styles.checkoutPage__form }>
              <TextField
                className={ styles.checkoutPage__input }
                label="First Name"
                variant="outlined"
                required={ true }
                name="first_name"
                onChange={ handleChange }
                onBlur={handleBlur}
                value={values.first_name}
                placeholder="First Name"
              />

              <TextField
                className={ styles.checkoutPage__input }
                label="last Name"
                variant="outlined"
                required={ true }
                name="last_name"
                onChange={ handleChange }
                onBlur={handleBlur}
                value={values.last_name}
                placeholder="Last Name"
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


              {errors.email && touched.email && errors.email}
              {errors.password && touched.password && errors.password}

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
        />
      </div>

    </div>
  )
}

export default CheckoutPage
